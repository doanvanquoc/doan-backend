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

const dongCa = async (req, res) => {
  try {
    const {idChiTietCa, soDuCuoi, ghiChu} = req.body;
    if (!idChiTietCa || !soDuCuoi) {
      return res.json({ success: false, message: 'Thiếu thông tin' });
    }
    const result = await service.dongCa(idChiTietCa, soDuCuoi, ghiChu);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  moCa,
  layDanhSachCa,
  layDanhSachChiTietCa,
  dongCa
};