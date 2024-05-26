const service = require('../services/khu_vuc');

const layDanhSachKhuVuc = async (req, res) => {
  try {
    const result = await service.layDanhSachKhuVuc();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  layDanhSachKhuVuc,
};