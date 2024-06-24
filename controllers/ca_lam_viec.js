const service = require('../services/ca_lam_viec');

const moCa = async (req, res) => {
  try {
    const result = await service.moCa(req.body, req.user);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layDanhSachCa = async (req, res) => {
  try {
    const result = await service.layDanhSachCa();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layDanhSachChiTietCa = async (req, res) => {
  try {
    const result = await service.layDanhSachChiTietCa();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  moCa,
  layDanhSachCa,
  layDanhSachChiTietCa
};