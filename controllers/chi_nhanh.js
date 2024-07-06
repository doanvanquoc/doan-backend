const service = require('../services/chi_nhanh');

const layDanhSachChiNhanh = async (req, res) => {
  try {
    const result = await service.layDanhSachChiNhanh();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const themChiNhanh = async (req, res) => {
  try {
    const result = await service.themChiNhanh(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatChiNhanh = async (req, res) => {
  try {
    const result = await service.capNhatChiNhanh(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachChiNhanh,
  themChiNhanh,
  capNhatChiNhanh
}