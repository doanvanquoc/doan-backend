const service = require('../services/hoa_don');

const layDanhSachHoaDon = async (req, res) => {
  try {
    const result = await service.layDanhSachHoaDon();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  layDanhSachHoaDon
}