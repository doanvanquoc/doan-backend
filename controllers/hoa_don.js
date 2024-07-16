const service = require('../services/hoa_don');

const layDanhSachHoaDon = async (req, res) => {
  try {
    const result = await service.layDanhSachHoaDon();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatBanTrongHoaDon = async (req, res) => {
  try {
    const { id_hoa_don, id_ban } = req.body;
    if (!id_hoa_don || !id_ban) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatBanTrongHoaDon(id_hoa_don, id_ban);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatTrangThai = async (req, res) => {
  try {
    const { id_hoa_don, trang_thai } = req.body;
    if (trang_thai != 0 && (!id_hoa_don || !trang_thai)) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatTrangThai(id_hoa_don, trang_thai);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const thanhToan = async (req, res) => {
  try {
    const { id_hoa_don, gio_ra, phuong_thuc_thanh_toan } = req.body;
    if (!id_hoa_don || !gio_ra || !phuong_thuc_thanh_toan) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.thanhToan(id_hoa_don, gio_ra, phuong_thuc_thanh_toan, req.user.tai_khoan);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatPhuongThucThanhToan = async (req, res) => {
  try {
    const { id_hoa_don, id_phuong_thuc } = req.body;
    if (!id_hoa_don || !id_phuong_thuc) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatPhuongThucThanhToan(id_hoa_don, id_phuong_thuc);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatTongTien = async (req, res) => {
  try {
    const { id_hoa_don, tong_tien } = req.body;
    if (!id_hoa_don || !tong_tien) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatTongTien(id_hoa_don, tong_tien);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatChietKhau = async (req, res) => {
  try {
    const { id_hoa_don, chiet_khau } = req.body;
    if (!id_hoa_don || !chiet_khau) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatChietKhau(id_hoa_don, chiet_khau);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const layDanhSachHoaDonPhanTrang = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const result = await service.layDanhSachHoaDonPhanTrang(page, limit, keyword.trim());
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}


module.exports = {
  layDanhSachHoaDon,
  capNhatBanTrongHoaDon,
  capNhatTrangThai,
  thanhToan,
  capNhatPhuongThucThanhToan,
  capNhatTongTien,
  capNhatChietKhau,
  layDanhSachHoaDonPhanTrang
}