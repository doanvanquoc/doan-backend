const db = require('../models');

const layDanhSachChucVu = () => new Promise(async (resolve, reject) => {
  try {
    const chucVu = await db.ChucVu.findAll();
    resolve({ success: true, data: chucVu });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  layDanhSachChucVu
}