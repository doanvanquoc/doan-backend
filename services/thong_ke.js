const db = require('../models')

const layTop5MonAn = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const danhSachMonAn = await db.ChiTietHoaDon.findAll({
      attributes: [
        'id_mon_an',
        [db.Sequelize.fn('sum', db.Sequelize.col('so_luong')), 'so_luong']
      ],
      group: ['id_mon_an'],
      order: [[db.Sequelize.fn('sum', db.Sequelize.col('so_luong')), 'DESC']],
      limit: 5,
      include: [
        {
          model: db.MonAn,
          as: 'mon_an',
          attributes: ['ten_mon_an']
        },
        {
          model: db.HoaDon,
          as: 'hoa_don',
          attributes: [],
          where: {
            ngay: {
              [db.Sequelize.Op.between]: [tuNgay, denNgay]
            },
            gio_ra: {
              [db.Sequelize.Op.ne]: null
            }
          },
          required: true  // Chỉ lấy những ChiTietHoaDon có liên kết với HoaDon có trang_thai = 2
        }
      ],
    });

    if (danhSachMonAn && danhSachMonAn.length > 0) {
      resolve({ success: true, data: danhSachMonAn });
    } else {
      resolve({ success: false, message: 'Không có món ăn nào được phục vụ trong khoảng thời gian này' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});


const tinhDoanhThuTheoKhoangThoiGian = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const ngayTrongKhoang = generateDateRange(tuNgay, denNgay);
    // Lấy danh sách doanh thu từ cơ sở dữ liệu
    const doanhThu = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      },
      attributes: [
        'ngay',
        [db.Sequelize.fn('sum', db.Sequelize.col('tong_tien')), 'doanh_thu']
      ],
      group: ['ngay'],
      raw: true,
      order: ['ngay'] // Sắp xếp ngày tăng dần
    });

    // Nếu không có ngày nào có hóa đơn, trả về thông báo
    if (doanhThu.length === 0) {
      resolve({ success: false, message: 'Không có doanh thu nào trong khoảng thời gian này' });
      return;
    }

    // Map kết quả từ cơ sở dữ liệu vào danh sách ngày trong khoảng
    const formattedData = ngayTrongKhoang.map(date => {
      const found = doanhThu.find(item => item.ngay === date);
      return {
        ngay: date,
        doanh_thu: found ? parseFloat(found.doanh_thu).toFixed(2) : '0.00'
      };
    });

    resolve({ success: true, data: formattedData });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});


function generateDateRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const tinhTongDoanhThuTheoKhoangThoiGian = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const doanhThuHoadon = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      },
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.literal('tong_tien * (100 - chiet_khau) / 100')), 'doanh_thu']
      ],
      raw: true
    });

    // Tính doanh thu từ bảng ThongKeThu
    const doanhThuNgoai = await db.ThongKeThu.findAll({
      where: {
        thoi_gian: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
      },
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.col('so_tien')), 'doanh_thu']
      ],
      raw: true
    });
    const tongDoanhThuHoadon = doanhThuHoadon[0].doanh_thu || 0;
    const tongDoanhThuNgoai = doanhThuNgoai[0].doanh_thu || 0;
    const tongDoanhThu = parseFloat(tongDoanhThuNgoai) + parseFloat(tongDoanhThuHoadon);

    resolve({ success: true, data: tongDoanhThu });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const tinhDoanhThuTheoTuan = () => new Promise(async (resolve, reject) => {
  try {
    // Lấy danh sách doanh thu trong 7 ngày gần nhất từ cơ sở dữ liệu
    const doanhThu = await db.HoaDon.findAll({
      where: {
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        },
        ngay: {
          [db.Sequelize.Op.gte]: db.Sequelize.literal('CURRENT_DATE - INTERVAL 7 DAY')
        }
      },
      attributes: [
        'ngay',
        [db.Sequelize.fn('sum', db.Sequelize.col('tong_tien')), 'doanh_thu']
      ],
      group: ['ngay'],
      //sắp xếp ngày tăng dần
      order: ['ngay'],
      raw: true
    });

    // Tạo một mảng chứa 7 ngày gần nhất
    const ngayTrongTuan = [];
    for (let i = 6; i >= 0; i--) {
      const ngay = new Date();
      ngay.setDate(ngay.getDate() - i);
      ngayTrongTuan.push(ngay.toISOString().split('T')[0]); // Chuyển ngày về định dạng 'YYYY-MM-DD'

    }
    const doanhThuMap = {};
    doanhThu.forEach(item => {
      doanhThuMap[item.ngay] = parseFloat(item.doanh_thu);
    });

    // Tạo một mảng kết quả với đầy đủ 7 ngày và doanh thu tương ứng
    const result = ngayTrongTuan.map(ngay => ({
      ngay: ngay,
      doanh_thu: doanhThuMap[ngay] || 0 // Nếu không có dữ liệu thì trả về 0
    }));

    resolve({ success: true, data: result });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layTopPhuongThucThanhToan = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const danhSachPhuongThucThanhToan = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      },
      attributes: ['phuong_thuc_thanh_toan', [db.Sequelize.fn('count', db.Sequelize.col('phuong_thuc_thanh_toan')), 'so_luong']],
      group: ['phuong_thuc_thanh_toan'],
      order: [[db.Sequelize.fn('count', db.Sequelize.col('phuong_thuc_thanh_toan')), 'DESC']],
      limit: 5,
      include: [
        {
          model: db.PhuongThucThanhToan,
          as: 'phuong_thuc',
          attributes: ['ten_phuong_thuc']
        }
      ]
    })
    if (danhSachPhuongThucThanhToan && danhSachPhuongThucThanhToan.length > 0) {
      resolve({ success: true, data: danhSachPhuongThucThanhToan })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy phương thức thanh toán nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const tinhGiamGiaVaChiPhiTheoKhoangThoiGian = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const giamGia = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      },
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.literal('tong_tien * chiet_khau / 100')), 'giam_gia']
      ],
      raw: true
    });

    const chiPhi = await db.ThongKeChi.findAll({
      where: {
        thoi_gian: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        }
      },
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.col('so_tien')), 'chi_phi']
      ],
      raw: true
    });

    const tongGiamGia = giamGia[0].giam_gia || 0;
    const tongChiPhi = chiPhi[0].chi_phi || 0;
    const tongChiTieu = parseFloat(tongGiamGia) + parseFloat(tongChiPhi);
    resolve({ success: true, data: tongChiTieu })
  } catch (error) {
    reject({ success: false, message: error })
  }
})

const tinhSoHoaDonVaTrungBinhTien = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    // Đếm số lượng hóa đơn
    const soHoaDon = await db.HoaDon.count({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      }
    });

    // Tính tổng tiền sau khi trừ chiết khấu
    const tongTien = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        gio_ra: {
          [db.Sequelize.Op.ne]: null
        }
      },
      attributes: [
        [db.Sequelize.fn('sum', db.Sequelize.literal('tong_tien * (100 - chiet_khau) / 100')), 'tong_tien_sau_chiet_khau']
      ],
      raw: true
    });

    // Lấy tổng tiền từ kết quả truy vấn
    const tongTienSauChietKhau = tongTien[0].tong_tien_sau_chiet_khau || 0;

    // Tính trung bình tiền
    const trungBinhTien = parseFloat(tongTienSauChietKhau) / soHoaDon;

    resolve({ success: true, data: { soHoaDon, trungBinhTien } });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const thongKeNhanVienBanChayTheoKhoangThoiGian = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const danhSachNhanVien = await db.ChiTietHoaDon.findAll({
      attributes: [
        [db.Sequelize.fn('count', db.Sequelize.col('ChiTietHoaDon.tai_khoan')), 'so_luong']
      ],
      group: ['ChiTietHoaDon.tai_khoan'],
      order: [[db.Sequelize.fn('count', db.Sequelize.col('ChiTietHoaDon.tai_khoan')), 'DESC']],
      limit: 5,
      include: [
        {
          model: db.TaiKhoan,
          as: 'nhan_vien',
          attributes: ['ten_hien_thi']
        },
        {
          model: db.HoaDon,
          as: 'hoa_don',
          attributes: [],
          where: {
            ngay: {
              [db.Sequelize.Op.between]: [tuNgay, denNgay]
            },
            gio_ra: {
              [db.Sequelize.Op.ne]: null
            }
          },
          required: true
        }
      ]
    });

    if (danhSachNhanVien && danhSachNhanVien.length > 0) {
      resolve({ success: true, data: danhSachNhanVien });
    } else {
      resolve({ success: false, message: 'Không có nhân viên phục vụ nào làm việc trong khoảng thời gian này' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});






module.exports = {
  layTop5MonAn,
  tinhDoanhThuTheoKhoangThoiGian,
  tinhDoanhThuTheoTuan,
  tinhTongDoanhThuTheoKhoangThoiGian,
  layTopPhuongThucThanhToan,
  tinhGiamGiaVaChiPhiTheoKhoangThoiGian,
  tinhSoHoaDonVaTrungBinhTien,
  thongKeNhanVienBanChayTheoKhoangThoiGian
}