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
    console.log("0");
    const hoaDonMoi = await db.HoaDon.create(hoaDon);
    console.log("1");
    if (hoaDonMoi) {
      await Promise.all(danhSachChiTietHoaDon.map(async (chiTietHoaDon) => {
        chiTietHoaDon.id_hoa_don = hoaDonMoi.id_hoa_don;
        await db.ChiTietHoaDon.create(chiTietHoaDon);
      }));
      console.log('2');
      const thongTinHoaDon = await db.HoaDon.findOne({
        where: { id_hoa_don: hoaDonMoi.id_hoa_don },
        attributes: {exclude: ['id_ban']},
        include: [
          {
            model: db.Ban,
            as: 'ban',
            attributes: ['id_ban', 'ten_ban'],
            include: [
              {
                model: db.KhuVuc,
                as: 'khu_vuc',
                attributes: ['id_khu_vuc', 'ten_khu_vuc']
              }
            ]
          },
          {
            model: db.ChiTietHoaDon,
            as: 'chi_tiet_hoa_don',
            include: [
              {
                model: db.MonAn,
                as: 'mon_an',
                include: [
                  {
                    model: db.HinhAnhMonAn,
                    as: 'hinh_anh',
                    attributes: ['id_hinh_anh', 'duong_dan'],
                  }
                ]
              }
            ]
          },
          
        ]
      });
      console.log("3");
      resolve({ success: true, data: thongTinHoaDon });
    }
    else {
      reject({ success: false, message: 'Tạo hóa đơn thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const themMonVaoHoaDonDaCo = (id_hoa_don, danhSachChiTietHoaDon) => new Promise(async (resolve, reject) => {
  try {
    const hoaDonMoi = await db.HoaDon.findOne({ where: { id_hoa_don} });
    if (hoaDonMoi) {
      await Promise.all(danhSachChiTietHoaDon.map(async (chiTietHoaDon) => {
        chiTietHoaDon.id_hoa_don = hoaDonMoi.id_hoa_don;
        await db.ChiTietHoaDon.create(chiTietHoaDon);
      }));

      //tinh lai tong tien
      const tongTien = await db.ChiTietHoaDon.sum('thanh_tien', { where: { id_hoa_don } });
      await db.HoaDon.update({ tong_tien: tongTien }, { where: { id_hoa_don } });
      const thongTinHoaDon = await db.HoaDon.findOne({
        where: { id_hoa_don: hoaDonMoi.id_hoa_don },
        attributes: {exclude: ['id_ban']},
        include: [
          {
            model: db.Ban,
            as: 'ban',
            attributes: ['id_ban', 'ten_ban'],
            include: [
              {
                model: db.KhuVuc,
                as: 'khu_vuc',
                attributes: ['id_khu_vuc', 'ten_khu_vuc']
              }
            ]
          },
          {
            model: db.ChiTietHoaDon,
            as: 'chi_tiet_hoa_don',
            include: [
              {
                model: db.MonAn,
                as: 'mon_an',
                include: [
                  {
                    model: db.HinhAnhMonAn,
                    as: 'hinh_anh',
                    attributes: ['id_hinh_anh', 'duong_dan'],
                  }
                ]
              }
            ]
          },
          
        ]
      });
      resolve({ success: true, data: thongTinHoaDon });
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
  datMon,
  themMonVaoHoaDonDaCo
}