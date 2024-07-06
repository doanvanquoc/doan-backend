const service = require('../services/chi_nhanh');

const layDanhSachChiNhanh = async (req, res) => {
  try {
    const result = await service.layDanhSachChiNhanh();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachChiNhanh
}