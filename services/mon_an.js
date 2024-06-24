const db = require('../models');
const io = require('../config/socket').getSocketIO();
const banService = require('./ban');
const layDanhSachMonAnPhanTrang = (page, limit) => new Promise(async (resolve, reject) => {
  try {
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: monAn } = await db.MonAn.findAndCountAll({
      include: [
        {
          model: db.DanhMucMonAn,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc']
        },
      ],
      limit: limit,
      offset: offset,
    });

    resolve({
      success: true,
      data: monAn,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
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

const layDanhSachMonAn = () => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findAll({
      include: [
        {
          model: db.DanhMucMonAn,
          as: 'danh_muc',
          attributes: ['id_danh_muc', 'ten_danh_muc']
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

const datMon = (hoaDon, danhSachChiTietHoaDon, user) => new Promise(async (resolve, reject) => {
  try {
    const hoaDonMoi = await db.HoaDon.create(hoaDon);
    if (hoaDonMoi) {
      await Promise.all(danhSachChiTietHoaDon.map(async (chiTietHoaDon) => {
        chiTietHoaDon.id_hoa_don = hoaDonMoi.id_hoa_don;
        chiTietHoaDon.tai_khoan = user;
        await db.ChiTietHoaDon.create(chiTietHoaDon);
      }));
      const thongTinHoaDon = await db.HoaDon.findOne({
        where: { id_hoa_don: hoaDonMoi.id_hoa_don },
        attributes: {exclude: ['id_ban', 'phuong_thuc_thanh_toan']},
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
              }
            ]
          },
          {
            model: db.PhuongThucThanhToan,
            as: 'phuong_thuc',
            attributes: ['id_thanh_toan', 'ten_phuong_thuc']
          }
          
        ]
      });
      await banService.capNhatTrangThaiBan(hoaDonMoi.id_ban, 1);
      resolve({ success: true, data: thongTinHoaDon });
    }
    else {
      reject({ success: false, message: 'Tạo hóa đơn thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const themMonVaoHoaDonDaCo = (id_hoa_don, danhSachChiTietHoaDon, user) => new Promise(async (resolve, reject) => {
  try {
    const hoaDonMoi = await db.HoaDon.findOne({ where: { id_hoa_don} });
    if (hoaDonMoi) {
      await Promise.all(danhSachChiTietHoaDon.map(async (chiTietHoaDon) => {
        chiTietHoaDon.id_hoa_don = hoaDonMoi.id_hoa_don;
        await db.ChiTietHoaDon.create(chiTietHoaDon);
      }));

      
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

const capNhatTrangThaiMonAn = (trangThai, idMonAn) => new Promise(async (resolve, reject) => {
  try {
    const monAn = await db.MonAn.findOne({ where: { id_mon_an: idMonAn } });
    if (monAn) {
      await db.MonAn.update({ trang_thai: trangThai }, { where: { id_mon_an: idMonAn } });
      resolve({ success: true, message: 'Cập nhật trạng thái món ăn thành công' });
      io.emit('cap-nhat-trang-thai-mon-an', { idMonAn, trangThai })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy món ăn' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
})

module.exports = {
  layDanhSachMonAnPhanTrang,
  layDanhSachMonAn,
  layMonAnTheoDanhMuc,
  datMon,
  themMonVaoHoaDonDaCo,
  capNhatTrangThaiMonAn
}