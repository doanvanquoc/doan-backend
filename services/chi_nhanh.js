const db = require('../models');

const layDanhSachChiNhanh = () => new Promise(async (resolve, reject) => {
  try {
    const chiNhanh = await db.ChiNhanh.findAll();
    resolve({ success: true, data: chiNhanh });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const themChiNhanh = (chiNhanh) => new Promise(async (resolve, reject) => {
  try {
    const newChiNhanh = await db.ChiNhanh.create(chiNhanh);
    resolve({ success: true, data: newChiNhanh });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const capNhatChiNhanh = (chiNhanh) => new Promise(async (resolve, reject) => {
  try {
    await db.ChiNhanh.update(chiNhanh, {
      where: {
        id_chi_nhanh: chiNhanh.id_chi_nhanh
      }
    });
    const newChiNhanh = await db.ChiNhanh.findByPk(chiNhanh.id_chi_nhanh);
    resolve({ success: true, data: newChiNhanh });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = { layDanhSachChiNhanh, themChiNhanh, capNhatChiNhanh}