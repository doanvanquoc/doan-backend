
const db = require('../models');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
//hash password
const hashPassword = (password) => bcrypt.hashSync(password, salt);

const dangKy = (username, password) => new Promise(async (resolve, reject) => {
  try {
    const res = await db.Account.findOrCreate({
      where: { username },
      defaults: { username, password: hashPassword(password) }
    });
    if (res[1]) {
      const token = jwt.sign({ id: res[0].id, username: res[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' })
      resolve({ success: true, message: 'Tạo tài khoản thành công', token });
    } else {
      resolve({ success: false, message: 'Tài khoản đã tồn tại' });
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
      // const isMatch = bcrypt.compareSync(password, account.password);
      const isMatch = mat_khau === account.mat_khau;
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

module.exports = {
  login: dangNhap,
  register: dangKy,
  dangNhapBangKhuonMat,
  layLichSuDatMon
}