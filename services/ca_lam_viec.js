const db = require('../models');

const moCa = (chiTietCa, user) => new Promise(async (resolve, reject) => {
  try {
    chiTietCa.tai_khoan = user.tai_khoan;
    const res = await db.ChiTietCaLamViec.create(chiTietCa);
    if (res) {
      resolve({ success: true, message: 'Mở ca thành công' });
    } else {
      resolve({ success: false, message: 'Mở ca thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layDanhSachCa = () => new Promise(async (resolve, reject) => {
  try {
    const res = await db.CaLamViec.findAll();
    if (res) {
      resolve({ success: true, data: res });
    } else {
      resolve({ success: false, message: 'Không có ca nào' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  moCa,
  layDanhSachCa
};