const db = require('../models');

const layDanhSachChucVu = () => new Promise(async (resolve, reject) => {
  try {
    const chucVu = await db.ChucVu.findAll();
    resolve({ success: true, data: chucVu });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const themChucVu = (thongTin) => new Promise(async (resolve, reject) => {
  try {
    const chucVu = await db.ChucVu.create(thongTin);
    resolve({ success: true, data: chucVu });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const capNhatChucVu = (id, thongTin) => new Promise(async (resolve, reject) => {
  try {
    const chucVu = await db.ChucVu.update(thongTin, { where: { id_chuc_vu: id } });
    const chucVuUpdated = await db.ChucVu.findOne({ where: { id_chuc_vu: id } });
    resolve({ success: true, data: chucVuUpdated });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  layDanhSachChucVu,
  themChucVu,
  capNhatChucVu
}