const db = require('../models')

const layDanhSachHoaDon = () => new Promise( async (resolve, reject) => {
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
              }
            ]
          }
        ]
      }
    )
    if (danhSachHoaDon && danhSachHoaDon.length > 0) {
      resolve({success: true, data: danhSachHoaDon})
    }
    else {
      resolve({success: false, message: 'Không tìm thấy hóa đơn nào'})
    }
  } catch (error) {
    reject({success: false, message: error.message})
  }
})

module.exports = {
  layDanhSachHoaDon
}