
const db = require('../models');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
//hash password
const hashPassword = (password) => bcrypt.hashSync(password, salt);

const dangKy = (thongTin) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.TaiKhoan.findOne({ where: { tai_khoan: thongTin.tai_khoan } });
    if (account) {
      reject({ success: false, message: 'Tài khoản đã tồn tại' });
    } else {
      const res = await db.TaiKhoan.create({ ...thongTin, mat_khau: hashPassword(thongTin.mat_khau) });
      if (res) {
        resolve({ success: true, message: 'Đăng ký thành công' });
      } else {
        resolve({ success: false, message: 'Đăng ký thất bại' });
      }
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const dangNhap = (tai_khoan, mat_khau) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.TaiKhoan.findOne({ where: { tai_khoan } });
    if (!account) {
      reject({ success: false, message: 'Tài khoản không tồn tại' });
    } else {
      const isMatch = bcrypt.compareSync(mat_khau, account.mat_khau);
      const taiKhoan = await db.TaiKhoan.findOne({ where: { tai_khoan }, include: { model: db.ChucVu, as: 'chuc_vu', attributes: { exclude: ['id_chuc_vu'] } }, attributes: { exclude: ['mat_khau', 'id_chuc_vu'] } });
      if (isMatch) {
        const token = jwt.sign({ taiKhoan }, process.env.JWT_SECRET, { expiresIn: '8h' })
        // resolve({ success: true, message: 'Đăng nhập thành công', token });
        resolve({ success: true, message: 'Đăng nhập thành công', data: taiKhoan, token });
      } else {
        resolve({ success: false, message: 'Mật khẩu không đúng' });
      }
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const dangNhapBangKhuonMat = (tai_khoan) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.TaiKhoan.findOne({ where: { tai_khoan } });
    if (!account) {
      reject({ success: false, message: 'Tài khoản không tồn tại' });
    } else {
      const taiKhoan = await db.TaiKhoan.findOne({ where: { tai_khoan }, include: { model: db.ChucVu, as: 'chuc_vu', attributes: { exclude: ['id_chuc_vu'] } }, attributes: { exclude: ['mat_khau', 'id_chuc_vu'] } });
      const token = jwt.sign({ taiKhoan }, process.env.JWT_SECRET, { expiresIn: '8h' })
      resolve({ success: true, message: 'Đăng nhập thành công', data: taiKhoan, token });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layLichSuDatMon = (user) => new Promise(async (resolve, reject) => {
  try {
    const lichSuDatMon = await db.HoaDon.findAll({
      include: [
        {
          model: db.ChiTietHoaDon,
          as: 'chi_tiet_hoa_don',
          where: { tai_khoan: user.tai_khoan },
          include: { model: db.MonAn, as: 'mon_an', attributes: { exclude: ['id_mon_an'] } },
          attributes: { exclude: ['id_hoa_don', 'id_mon_an'] }
        },
        { model: db.Ban, as: 'ban', attributes: { exclude: ['id_ban'] } },
        { model: db.PhuongThucThanhToan, as: 'phuong_thuc', attributes: { exclude: ['id_phuong_thuc_thanh_toan'] } }
      ],
    })
    resolve({ success: true, message: 'Lấy lịch sử đặt món thành công', data: lichSuDatMon });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
})

const doiMatKhau = (tai_khoan, mat_khau_cu, mat_khau_moi) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.TaiKhoan.findOne({ where: { tai_khoan } });
    if (!account) {
      reject({ success: false, message: 'Tài khoản không tồn tại' });
    } else {
      const isMatch = bcrypt.compareSync(mat_khau_cu, account.mat_khau);
      // const isMatch = mat_khau_cu === account.mat_khau;
      if (isMatch) {
        const res = await db.TaiKhoan.update({ mat_khau: hashPassword(mat_khau_moi) }, { where: { tai_khoan } });
        // const res = await db.TaiKhoan.update({ mat_khau: mat_khau_moi }, { where: { tai_khoan } });
        if (res) {
          resolve({ success: true, message: 'Đổi mật khẩu thành công' });
        } else {
          resolve({ success: false, message: 'Đổi mật khẩu thất bại' });
        }
      } else {
        resolve({ success: false, message: 'Mật khẩu cũ không đúng' });
      }
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const dangNhapAdmin = (tai_khoan, mat_khau) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.TaiKhoan.findOne({ where: { tai_khoan } });
    if (!account) {
      reject({ success: false, message: 'Tài khoản không tồn tại' });
    } else {
      const isMatch = mat_khau === account.mat_khau;
      const taiKhoan = await db.TaiKhoan.findOne({
        where: { tai_khoan }, include: {
          model: db.ChucVu, as: 'chuc_vu', where: {
            id_chuc_vu: 1
          }, attributes: { exclude: ['id_chuc_vu'] }
        }, attributes: { exclude: ['mat_khau', 'id_chuc_vu'] }
      });
      if (isMatch) {
        if (taiKhoan) {
          const token = jwt.sign({ taiKhoan }, process.env.JWT_SECRET, { expiresIn: '8h' })
          resolve({ success: true, message: 'Đăng nhập thành công', data: taiKhoan, token });
        }
        else {
          resolve({ success: false, message: 'Tài khoản không phải admin' });
        }
      } else {
        resolve({ success: false, message: 'Mật khẩu không đúng' });
      }
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  login: dangNhap,
  register: dangKy,
  dangNhapBangKhuonMat,
  layLichSuDatMon,
  doiMatKhau,
  dangNhapAdmin
}