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
    const { id_khu_vuc, trang_thai } = req.body;
    if (!id_khu_vuc) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin' });
      return;
    }
    const result = await service.capNhatTrangThaiKhuVuc(id_khu_vuc, trang_thai);
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
    const { id_khu_vuc } = req.params;
    if (!id_khu_vuc) {
      res.status(400).json({ success: false, message: 'Thiếu thông tin' });
      return;
    }
    const result = await service.capNhatKhuVuc(id_khu_vuc, req.body);
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