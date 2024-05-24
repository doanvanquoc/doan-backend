
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
      const token = jwt.sign({id: res[0].id, username: res[0].username}, process.env.JWT_SECRET, {expiresIn: '1h'})
      resolve({ success: true, message: 'Tạo tài khoản thành công', token });
    } else {
      reject({ success: false, message: 'Tài khoản đã tồn tại' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const dangNhap = (username, password) => new Promise(async (resolve, reject) => {
  try {
    const account = await db.Account.findOne({ where: { username } });
    if (!account) {
      reject({ success: false, message: 'Tài khoản không tồn tại' });
    } else {
      const isMatch = bcrypt.compareSync(password, account.password);
      if (isMatch) {
        const token = jwt.sign({id: account.id, username: account.username}, process.env.JWT_SECRET, {expiresIn: '1h'})
        resolve({ success: true, message: 'Đăng nhập thành công', token });
      } else {
        reject({ success: false, message: 'Mật khẩu không đúng' });
      }
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {
  login: dangNhap,
  register: dangKy
}