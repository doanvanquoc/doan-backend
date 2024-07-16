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
    const {id_chi_tiet_ca, so_du_cuoi, ghi_chu} = req.body;
    if (!id_chi_tiet_ca || !so_du_cuoi) {
      return res.json({ success: false, message: 'Thiếu thông tin' });
    }
    const result = await service.dongCa(id_chi_tiet_ca, so_du_cuoi, ghi_chu);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatCaLamViec = async (req, res) => {
  try {
    const {id_ca, ten_ca, bat_dau, ket_thuc} = req.body;
    if (!id_ca || !ten_ca || !bat_dau || !ket_thuc) {
      return res.json({ success: false, message: 'Thiếu thông tin' });
    }
    const ca = {ten_ca, bat_dau, ket_thuc};
    const result = await service.capNhatCaLamViec(id_ca, ca);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  moCa,
  layDanhSachCa,
  layDanhSachChiTietCa,
  dongCa,
  capNhatCaLamViec,
};