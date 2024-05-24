const db = require('../models');

const layDanhSachMonAn = () => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findAll();
    resolve({ success: true, data: monAn });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layMonAnTheoDanhMuc = (idDanhMuc) => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findAll({ where: { id_danh_muc:idDanhMuc } });
    if (monAn && monAn.length > 0) {
      resolve({ success: true, data: monAn });
    }
    else {
      reject({ success: false, message: 'Không tìm thấy món ăn' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  layDanhSachMonAn,
  layMonAnTheoDanhMuc
}