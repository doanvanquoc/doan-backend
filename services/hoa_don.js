const db = require('../models')
const { Op } = require('sequelize');


const layDanhSachHoaDon = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachHoaDon = await db.HoaDon.findAll(
      {
        include: [
          {
            model: db.ChiTietHoaDon,
            as: 'chi_tiet_hoa_don',
            include: [
              {
                model: db.MonAn,
                as: 'mon_an'
              },
            ]
          },
          {
            model: db.Ban,
            as: 'ban'
          },
          {
            model: db.PhuongThucThanhToan,
            as: 'phuong_thuc'
          },
          {
            model: db.ChiNhanh,
            as: 'chi_nhanh_lam_viec'
          },
          {
            model: db.TaiKhoan,
            as: 'tai_khoan',
            attributes: { exclude: ['mat_khau', 'id_chuc_vu', 'ca_lam_viec', 'trang_thai'] },
            include: [
              {
                model: db.ChucVu,
                as: 'chuc_vu',
                attributes: { exclude: ['id_chuc_vu'] }
              },
              {
                model: db.CaLamViec,
                as: 'ca',
                attributes: { exclude: ['id_ca'] }
              }
            ]
          },
        ],
      // sắp xếp mới nhất lên đầu, theo giờ vào sớm nhất
      order: [['gio_vao', 'ASC']]
      }
    )
    if (danhSachHoaDon && danhSachHoaDon.length > 0) {
      resolve({ success: true, data: danhSachHoaDon })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})


const layDanhSachHoaDonPhanTrang = (page, limit, keyword) => new Promise(async (resolve, reject) => {
  try {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    let includeArray = [
      {
        model: db.ChiTietHoaDon,
        as: 'chi_tiet_hoa_don',
        include: [
          {
            model: db.MonAn,
            as: 'mon_an'
          },
        ]
      },
      {
        model: db.Ban,
        as: 'ban'
      },
      {
        model: db.PhuongThucThanhToan,
        as: 'phuong_thuc'
      },
      {
        model: db.ChiNhanh,
        as: 'chi_nhanh_lam_viec'
      },
      {
        model: db.TaiKhoan,
        as: 'tai_khoan',
        attributes: { exclude: ['mat_khau', 'id_chuc_vu', 'ca_lam_viec', 'trang_thai'] },
        include: [
          {
            model: db.ChucVu,
            as: 'chuc_vu',
            attributes: { exclude: ['id_chuc_vu'] }
          },
          {
            model: db.CaLamViec,
            as: 'ca',
            attributes: { exclude: ['id_ca'] }
          }
        ]
      },
    ];

    let whereClause = {};
    
    // Giải mã keyword và thêm điều kiện tìm kiếm nếu có
    if (keyword && keyword.trim() !== ''){
      const decodedKeyword = decodeURIComponent(keyword);
      whereClause = {
        [Op.or]: [
          { thu_ngan: { [Op.like]: `%${decodedKeyword}%` } },
        ]
      };
    }
    const { count, rows: danhSachHoaDon } = await db.HoaDon.findAndCountAll({
      include: includeArray,
      where: whereClause,
      limit: limit,
      offset: offset,
      order: [['gio_vao', 'DESC']]
    });

    resolve({
      success: true,
      data: danhSachHoaDon,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});



const capNhatBanTrongHoaDon = (idHoaDon, idBan) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(idHoaDon)
    if (hoaDon) {
      hoaDon.id_ban = idBan
      await hoaDon.save()
      resolve({ success: true, data: hoaDon })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatTrangThai = (idHoaDon, trangThai) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(idHoaDon)
    if (hoaDon) {
      hoaDon.trang_thai = trangThai
      await hoaDon.save()
      resolve({ success: true, data: hoaDon })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const thanhToan = (id_hoa_don, gio_ra, phuong_thuc_thanh_toan, ghi_chu, thu_ngan) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(id_hoa_don)
    if (hoaDon) {
      //update hoa don using thongTin
      const hoaDonMoi = await db.HoaDon.update({
        gio_ra,
        phuong_thuc_thanh_toan,
        ghi_chu,
        thu_ngan
      }, {
        where: {
          id_hoa_don: id_hoa_don
        }
      })
      resolve({ success: true, message: 'Thanh toán hóa đơn thành công' })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatPhuongThucThanhToan = (idHoaDon, idPhuongThucThanhToan) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(idHoaDon)
    if (hoaDon) {
      hoaDon.phuong_thuc_thanh_toan = idPhuongThucThanhToan
      await hoaDon.save()
      resolve({ success: true, message: 'Cập nhật phương thức thanh toán thành công' })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatTongTien = (idHoaDon, tongTien) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(idHoaDon)
    if (hoaDon) {
      hoaDon.tong_tien = tongTien
      await hoaDon.save()
      resolve({ success: true, message: 'Cập nhật tổng tiền thành công' })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatChietKhau = (idHoaDon, chietKhau) => new Promise(async (resolve, reject) => {
  try {
    const hoaDon = await db.HoaDon.findByPk(idHoaDon)
    if (hoaDon) {
      hoaDon.chiet_khau = chietKhau
      await hoaDon.save()
      resolve({ success: true, message: 'Cập nhật chiết khấu thành công' })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy hóa đơn nào' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})



module.exports = {
  layDanhSachHoaDon,
  capNhatBanTrongHoaDon,
  capNhatTrangThai,
  thanhToan,
  capNhatPhuongThucThanhToan,
  capNhatTongTien,
  capNhatChietKhau,
  layDanhSachHoaDonPhanTrang
}