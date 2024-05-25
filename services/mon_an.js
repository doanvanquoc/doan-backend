const db = require('../models');

const layDanhSachMonAn = () => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findAll({
      include: [
        {
          model: db.DanhMucMonAn,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc']
        },
        {
          model: db.HinhAnhMonAn,
          as: 'hinh_anh',
          attributes: ['id_hinh_anh', 'duong_dan']
        }
      ]
    });
    resolve({ success: true, data: monAn });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layMonAnTheoDanhMuc = (idDanhMuc) => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findAll({
      where: { id_danh_muc: idDanhMuc }, include: [
        {
          model: db.DanhMucMonAn,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc']
        },
        {
          model: db.HinhAnhMonAn,
          as: 'hinh_anh',
          attributes: ['id_hinh_anh', 'duong_dan']
        }
      ]
    });
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

const datMon = (hoaDon, danhSachChiTietHoaDon) => new Promise(async (resolve, reject) => {
  try {
    const hoaDonMoi = await db.HoaDon.create(hoaDon);
    if (hoaDonMoi) {
      danhSachChiTietHoaDon.forEach(async (chiTietHoaDon) => {
        chiTietHoaDon.id_hoa_don = hoaDonMoi.id_hoa_don;
        await db.ChiTietHoaDon.create(chiTietHoaDon);
      });
      resolve({ success: true, data: hoaDonMoi });
    }
    else {
      reject({ success: false, message: 'Tạo hóa đơn thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  layDanhSachMonAn,
  layMonAnTheoDanhMuc,
  datMon
}