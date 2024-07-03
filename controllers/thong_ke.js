const service = require('../services/thong_ke');

const layTop5MonAn = async (req, res) => {
  try {
    const result = await service.layTop5MonAn();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const tinhDoanhThuTheoNgay = async (req, res) => {
  try {
    const result = await service.tinhDoanhThuTheoNgay(req.query.ngay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const tinhDoanhThuTheoKhoangThoiGian = async (req, res) => {
  try {
    const result = await service.tinhDoanhThuTheoKhoangThoiGian(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const tinhDoanhThuTheoTuan = async (req, res) => {
  try {
    const result = await service.tinhDoanhThuTheoTuan();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  layTop5MonAn,
  tinhDoanhThuTheoNgay,
  tinhDoanhThuTheoKhoangThoiGian,
  tinhDoanhThuTheoTuan
}