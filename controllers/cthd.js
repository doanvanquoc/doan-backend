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
    res.status(500).json(error.message);
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
    res.status(500).json(error.message);
  }
}

module.exports = { 
  xoaDanhSachCTHD,
  capNhatIdHoaDon
}