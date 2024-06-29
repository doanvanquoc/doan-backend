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

module.exports = {
  layTop5MonAn
}