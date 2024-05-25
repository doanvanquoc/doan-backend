const service = require('../services/ban');

const layDanhSachBan = async (req, res) => {
  try {
    const result = await service.layDanhSachBan();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {layDanhSachBan}