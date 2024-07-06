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

const themNhomMon = (tenNhom) => new Promise(async (resolve, reject) => {
  try {
    const nhomMon = await db.DanhMucMonAn.create({
      ten_danh_muc: tenNhom
    });
    if (nhomMon) {
      const nhomMonMoiThem = await db.DanhMucMonAn.findOne({
        where: { id_danh_muc: nhomMon.id_danh_muc }
      });
      resolve({ success: true, data: nhomMonMoiThem });
    }
    else {
      resolve({ success: false, message: 'Thêm nhóm món thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const capNhatNhomMon = (idNhom, tenNhom) => new Promise(async (resolve, reject) => {
  try {
    const nhomMon = await db.DanhMucMonAn.findOne({ where: { id_danh_muc: idNhom } });
    if (nhomMon) {
      await db.DanhMucMonAn.update({ ten_danh_muc: tenNhom }, { where: { id_danh_muc: idNhom } });
      const nhomMonDaCapNhat = await db.DanhMucMonAn.findOne({
        where: { id_danh_muc: idNhom }
      });
      if (nhomMonDaCapNhat) {
        resolve({ success: true, data: nhomMonDaCapNhat });
      }
    }
    else {
      reject({ success: false, message: 'Không tìm thấy nhóm món' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});


module.exports = {
  layDanhSachDanhMucMonAn,
  themNhomMon,
  capNhatNhomMon
}