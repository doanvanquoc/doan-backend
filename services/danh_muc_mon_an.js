const db = require('../models');

const layDanhSachDanhMucMonAn = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachDanhMucMonAn = await db.DanhMucMonAn.findAll();
    if (danhSachDanhMucMonAn) {
      resolve({ success: true, data: danhSachDanhMucMonAn });
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy danh mục món ăn' });
    }
  } catch (error) {
    reject({success: false, message: error.message});
  }
});  

module.exports = {
  layDanhSachDanhMucMonAn
}