const service = require('../services/tai_khoan');

const register = async (req, res) => {
  const { username: tai_khoan, password } = req.body;
  if (!tai_khoan || !password) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
    return;
  }
  try {
    const result = await service.register(tai_khoan, password);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const login = async (req, res) => {
  const { tai_khoan, mat_khau } = req.body;
  if (!tai_khoan || !mat_khau) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
    return;
  }
  try {
    const result = await service.login(tai_khoan, mat_khau);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const dangNhapBangKhuonMat = async (req, res) => {
  const { tai_khoan } = req.body;
  if (!tai_khoan) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
    return;
  }
  try {
    const result = await service.dangNhapBangKhuonMat(tai_khoan);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layLichSuDatMon = async (req, res) => {
  const { user } = req;
  try {
    const result = await service.layLichSuDatMon(user);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  register,
  login,
  dangNhapBangKhuonMat,
  layLichSuDatMon
}