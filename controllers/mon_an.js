const monAnService = require('../services/mon_an');

const layDanhSachMonAn = async (req, res) => {
  try {
    const result = await monAnService.layDanhSachMonAn();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const layMonAnTheoDanhMuc = async (req, res) => {
  try {
    const idDanhMuc = req.params.id
    if (idDanhMuc != 0 && !idDanhMuc) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.layMonAnTheoDanhMuc(idDanhMuc);
    res.json(result)
  } catch (error) {
    res.status(500).json(error);
  }
}

const datMon = async (req, res) => {
  try {
    const {hoaDon, danhSachChiTietHoaDon} = req.body
    if (!hoaDon || !danhSachChiTietHoaDon) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.datMon(hoaDon, danhSachChiTietHoaDon, req.user.tai_khoan);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const themMonVaoHoaDonDaCo = async (req, res) => {
  try {
    const {id_hoa_don, danhSachChiTietHoaDon} = req.body
    if (!id_hoa_don || !danhSachChiTietHoaDon) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.themMonVaoHoaDonDaCo(id_hoa_don, danhSachChiTietHoaDon, req.user.tai_khoan);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const capNhatTrangThaiMonAn = async (req, res) => {
  try {
    const {idMonAn, trangThai} = req.body
    if (!idMonAn || (trangThai != 0 && !trangThai)) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.capNhatTrangThaiMonAn(trangThai, idMonAn);
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.json(error)
  }
}

module.exports = {
  layDanhSachMonAn,
  layMonAnTheoDanhMuc,
  datMon,
  themMonVaoHoaDonDaCo,
  capNhatTrangThaiMonAn
}