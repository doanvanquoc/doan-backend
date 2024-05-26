const db = require('../models')

const layDanhSachKhuVuc = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachKhuVuc = await db.KhuVuc.findAll()
    if (!danhSachKhuVuc) {
      resolve({success: false, message: 'Không tìm thấy khu vực nào'})
    }
    resolve({success: true, data: danhSachKhuVuc})
  } catch (error) {
    reject({success: false, message: error.message})
  }
})

module.exports = {
  layDanhSachKhuVuc,
}

