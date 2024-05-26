const service = require('../services/ban');

const layDanhSachBan = async (req, res) => {
  try {
    const result = await service.layDanhSachBan();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const layBanTheoKhuVuc = async (req, res) => {
  try {
    const { id_khu_vuc } = req.params;
    if (!id_khu_vuc) {
      return res.status(400).json({ success: false, message: 'Thiếu id khu vực' });
    }
    const result = await service.layBanTheoKhuVuc(id_khu_vuc);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {layDanhSachBan, layBanTheoKhuVuc}