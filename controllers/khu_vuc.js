const service = require('../services/khu_vuc');

const layDanhSachKhuVuc = async (req, res) => {
  try {
    const result = await service.layDanhSachKhuVuc(req);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const capNhatTrangThaiKhuVuc = async (req, res) => {
  try {
    const { idKhuVuc, trangThai } = req.body;
    if (!idKhuVuc) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin' });
      return;
    }
    const result = await service.capNhatTrangThaiKhuVuc(idKhuVuc, trangThai);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
} 

const layTatCaKhuVuc = async (req, res) => {
  try {
    const result = await service.layTatCaKhuVuc();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const themKhuVuc = async (req, res) => {
  try {
    const { ten_khu_vuc, chi_nhanh } = req.body;
    if (!ten_khu_vuc || !chi_nhanh) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin' });
      return;
    }
    const result = await service.themKhuVuc(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatKhuVuc = async (req, res) => {
  try {
    const { idKhuVuc } = req.params;
    if (!idKhuVuc) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin' });
      return;
    }
    const result = await service.capNhatKhuVuc(idKhuVuc, req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachKhuVuc,
  capNhatTrangThaiKhuVuc,
  layTatCaKhuVuc,
  themKhuVuc,
  capNhatKhuVuc
};