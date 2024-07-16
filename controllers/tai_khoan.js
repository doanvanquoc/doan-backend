const service = require('../services/tai_khoan');

const dangKy = async (req, res) => {
  if (!req.body.tai_khoan || !req.body.mat_khau || !req.body.email || !req.body.id_chuc_vu) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
    return;
  }
  try {
    const result = await service.register(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const dangNhap = async (req, res) => {
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

const doiMatKhau = async (req, res) => {
  const { user } = req;
  const { mat_khau_cu, mat_khau_moi } = req.body;
  if (!mat_khau_cu || !mat_khau_moi) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin mật khẩu' });
    return;
  }
  try {
    const result = await service.doiMatKhau(user.tai_khoan, mat_khau_cu, mat_khau_moi);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const dangNhapAdmin = async (req, res) => {
  const { tai_khoan, mat_khau } = req.body;
  if (!tai_khoan || !mat_khau) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
    return;
  }
  try {
    const result = await service.dangNhapAdmin(tai_khoan, mat_khau);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layDanhSachNhanVien = async (req, res) => {
  const { page, limit, keyword } = req.query;
  try {
    const result = await service.layDanhSachNhanVien(page, limit, keyword.trim());
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}


const capNhatNhanVien = async (req, res) => {
  try {
    const result = await service.capNhatNhanVien(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const xoaNhanVien = async (req, res) => {
  try {
    const taiKhoan = req.params.taiKhoan;
    console.log('taikhoan', taiKhoan);
    const result = await service.xoaNhanVien(taiKhoan);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  dangKy: dangKy,
  dangNhap: dangNhap,
  dangNhapBangKhuonMat,
  layLichSuDatMon,
  doiMatKhau,
  dangNhapAdmin,
  layDanhSachNhanVien,
  capNhatNhanVien,
  xoaNhanVien
}