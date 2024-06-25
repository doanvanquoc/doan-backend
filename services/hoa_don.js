const { where } = require('sequelize')
const db = require('../models')

const layDanhSachHoaDon = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachHoaDon = await db.HoaDon.findAll(

      {
        where: { trang_thai: 1 },
        include: [
          {
            model: db.ChiTietHoaDon,
            as: 'chi_tiet_hoa_don',
            include: [
              {
                model: db.MonAn,
                as: 'mon_an'
              }
            ]
          }
        ]
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

module.exports = {
  layDanhSachHoaDon,
  capNhatBanTrongHoaDon,
  capNhatTrangThai,
  thanhToan
}