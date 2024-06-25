const db = require('../models');

const themThongKeChi = (thongKeChi, user) => new Promise(async (resolve, reject) => {
  try {
    thongKeChi.tai_khoan = user.tai_khoan;
    console.log(thongKeChi);
    const result = await db.ThongKeChi.create(thongKeChi);
    if (result) {
      resolve({ success: true, message: 'Thêm thành công' });
    }
    else {
      resolve({ success: false, message: 'Thêm thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
});

const layDanhSachNghiepVuChi = () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.NghiepVuChi.findAll();
    if (result) {
      resolve({ success: true, data: result });
    }
    else {
      resolve({ success: false, message: 'Không có dữ liệu' });
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
});

const layDanhSachThongKeChi = () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.ThongKeChi.findAll();
    if (result) {
      resolve({ success: true, data: result });
    }
    else {
      resolve({ success: false, message: 'Không có dữ liệu' });
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
});

module.exports = {
  themThongKeChi,
  layDanhSachThongKeChi,
  layDanhSachNghiepVuChi
}