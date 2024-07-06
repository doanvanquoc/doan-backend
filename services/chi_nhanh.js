const db = require('../models');

const layDanhSachChiNhanh = () => new Promise(async (resolve, reject) => {
  try {
    const chiNhanh = await db.ChiNhanh.findAll();
    resolve({ success: true, data: chiNhanh });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = { layDanhSachChiNhanh }