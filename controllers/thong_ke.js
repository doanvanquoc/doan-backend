const service = require('../services/thong_ke');

const layTop5MonAn = async (req, res) => {
  try {
    const result = await service.layTop5MonAn(req.query.tuNgay, req.query.denNgay);
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

const tinhTongDoanhThuTheoKhoangThoiGian = async (req, res) => {
  try {
    const result = await service.tinhTongDoanhThuTheoKhoangThoiGian(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const layTopPhuongThucThanhToan = async (req, res) => {
  try {
    const result = await service.layTopPhuongThucThanhToan(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const tinhGiamGiaVaChiPhiTheoKhoangThoiGian = async (req, res) => {
  try {
    const result = await service.tinhGiamGiaVaChiPhiTheoKhoangThoiGian(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const tinhSoHoaDonVaTrungBinhTien = async (req, res) => {
  try {
    const result = await service.tinhSoHoaDonVaTrungBinhTien(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const thongKeNhanVienBanChayTheoKhoangThoiGian = async (req, res) => {
  try {
    const result = await service.thongKeNhanVienBanChayTheoKhoangThoiGian(req.query.tuNgay, req.query.denNgay);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  layTop5MonAn,
  tinhDoanhThuTheoKhoangThoiGian,
  tinhDoanhThuTheoTuan,
  tinhTongDoanhThuTheoKhoangThoiGian,
  layTopPhuongThucThanhToan,
  tinhGiamGiaVaChiPhiTheoKhoangThoiGian,
  tinhSoHoaDonVaTrungBinhTien,
  thongKeNhanVienBanChayTheoKhoangThoiGian
}