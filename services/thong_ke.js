const db = require('../models')

const layTop5MonAn = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachMonAn = await db.ChiTietHoaDon.findAll({
      attributes: ['id_mon_an', [db.Sequelize.fn('sum', db.Sequelize.col('so_luong')), 'so_luong']],
      group: ['id_mon_an'],
      order: [[db.Sequelize.fn('sum', db.Sequelize.col('so_luong')), 'DESC']],
      limit: 5,
      include: [
        {
          model: db.MonAn,
          as: 'mon_an',
          attributes: ['ten_mon_an']
        }
      ]
    })
    if (danhSachMonAn && danhSachMonAn.length > 0) {
      resolve({ success: true, data: danhSachMonAn })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy món ăn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const tinhDoanhThuTheoNgay = (ngay) => new Promise(async (resolve, reject) => {
  try {
    const doanhThu = await db.HoaDon.findAll({
      where: {
        ngay: ngay,
        trang_thai: 1
      },
      attributes: [[db.Sequelize.fn('sum', db.Sequelize.col('tong_tien')), 'doanh_thu']]
    })
    if (doanhThu && doanhThu.length > 0) {
      resolve({ success: true, data: doanhThu })
    }
    else {
      resolve({ success: false, message: 'Không có doanh thu' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const tinhDoanhThuTheoKhoangThoiGian = (tuNgay, denNgay) => new Promise(async (resolve, reject) => {
  try {
    const doanhThu = await db.HoaDon.findAll({
      where: {
        ngay: {
          [db.Sequelize.Op.between]: [tuNgay, denNgay]
        },
        trang_thai: 1
      },
      attributes: [[db.Sequelize.fn('sum', db.Sequelize.col('tong_tien')), 'doanh_thu']]
    })
    if (doanhThu && doanhThu.length > 0) {
      resolve({ success: true, data: doanhThu })
    }
    else {
      resolve({ success: false, message: 'Không có doanh thu' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})


//liet ke tong doanh thu cua moi ngay trong 7 ngay gan nhat
const tinhDoanhThuTheoTuan = () => new Promise(async (resolve, reject) => {
  try {
    // Lấy danh sách doanh thu trong 7 ngày gần nhất từ cơ sở dữ liệu
    const doanhThu = await db.HoaDon.findAll({
      where: {
        trang_thai: 1,
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
    console.log('=======================');
    console.log(ngayTrongTuan);
    console.log('=======================');
    console.log(doanhThu);
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


module.exports = {
  layTop5MonAn,
  tinhDoanhThuTheoNgay,
  tinhDoanhThuTheoKhoangThoiGian,
  tinhDoanhThuTheoTuan
}