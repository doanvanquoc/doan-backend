const db = require('../models');

const moCa = (chiTietCa, user) => new Promise(async (resolve, reject) => {
  try {
    chiTietCa.tai_khoan = user.tai_khoan;
    const res = await db.ChiTietCaLamViec.create(chiTietCa);
    if (res) {
      const chiTietCaMoi = await db.ChiTietCaLamViec.findOne({
        where: {
          id_chi_tiet_ca: res.id_chi_tiet_ca
        },
        include: [
          {
            model: db.CaLamViec,
            as: 'ca_lam_viec',
          }
        ],
        attributes: { exclude: ['id_ca'] }
      });
      resolve({ success: true, message: 'Mở ca thành công', data: chiTietCaMoi });
    } else {
      resolve({ success: false, message: 'Mở ca thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const dongCa =(idChiTietCa, soDuCuoi, ghiChu) => new Promise(async (resolve, reject) => {
  try {
    const res = await db.ChiTietCaLamViec.update({
      so_du_cuoi: soDuCuoi,
      ghi_chu: ghiChu,
    }, {
      where: {
        id_chi_tiet_ca: idChiTietCa
      }
    });
    if (res) {
      resolve({ success: true, message: 'Đóng ca thành công' });
    } else {
      resolve({ success: false, message: 'Đóng ca thất bại' });
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

const layDanhSachChiTietCa = () => new Promise(async (resolve, reject) => {
  try {
    const res = await db.ChiTietCaLamViec.findAll({
      include: [
        {
          model: db.CaLamViec,
          as: 'ca_lam_viec',
        }
      ],
      attributes: { exclude: ['id_ca'] }

    });
    if (res) {
      resolve({ success: true, data: res });
    } else {
      resolve({ success: false, message: 'Không có chi tiết ca nào' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const capNhatCaLamViec = (idCa, ca) => new Promise(async (resolve, reject) => {
  try {
    const res = await db.CaLamViec.update(ca, {
      where: {
        id_ca: idCa
      }
    });
    if (res) {
      const caLamViecMoi = await db.CaLamViec.findOne({
        where: {
          id_ca: idCa
        }});
      resolve({ success: true, message: 'Cập nhật ca thành công', data: caLamViecMoi });
    } else {
      resolve({ success: false, message: 'Cập nhật ca thất bại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  moCa,
  layDanhSachCa,
  layDanhSachChiTietCa,
  dongCa,
  capNhatCaLamViec
};