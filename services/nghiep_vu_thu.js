const db = require('../models');

const themThongKeThu = (thongKeThu, user) => new Promise(async (resolve, reject) => {
  try {
    thongKeThu.tai_khoan = user.tai_khoan;
    console.log(thongKeThu);
    const result = await db.ThongKeThu.create(thongKeThu);
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

const layDanhSachThongKeThu = () => new Promise(async (resolve, reject) => {
  try {
    const result = await db.ThongKeThu.findAll();
    console.log(result);
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
  themThongKeThu,
  layDanhSachThongKeThu
}