const service = require('../services/khu_vuc');

const layDanhSachKhuVuc = async (req, res) => {
  try {
    const result = await service.layDanhSachKhuVuc();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
} 

module.exports = {
  layDanhSachKhuVuc,
  capNhatTrangThaiKhuVuc
};