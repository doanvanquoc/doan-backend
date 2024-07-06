const service = require('../services/cthd');

const xoaDanhSachCTHD = async (req, res) => {
  try {
    const { danhSachId, idHoaDon } = req.body;
    if (!danhSachId || !idHoaDon) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.xoaDanhSachCTHD(danhSachId, idHoaDon);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatIdHoaDon = async (req, res) => {
  try {
    const { idCTHD, idHoaDon } = req.body;
    if (!idCTHD || !idHoaDon) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatIdHoaDon(idCTHD, idHoaDon);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatDanhSachCTHD = async (req, res) => {
  try {
    const { danhSachCTHD, idHoaDon } = req.body;
    if (!danhSachCTHD, !idHoaDon) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatDanhSachCTHD(danhSachCTHD, idHoaDon);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatTrangThaiCTHD = async (req, res) => {
  try {
    const { idCTHD, trangThai } = req.body;
    if (trangThai != 0 && (!idCTHD || !trangThai)) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatTrangThaiCTHD(idCTHD, trangThai);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = { 
  xoaDanhSachCTHD,
  capNhatIdHoaDon,
  capNhatDanhSachCTHD,
  capNhatTrangThaiCTHD
}