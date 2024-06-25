const db = require('../models')

const layDanhSachPTTT = () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.PhuongThucThanhToan.findAll()
    if (result) {
      resolve({ success: true, data: result })
    }
    else {
      resolve({ success: false, message: 'Không có PTTT nào' })
    }
  } catch (error) {
    reject({ success: false, message: error })
  }
})

module.exports = {
  layDanhSachPTTT
}