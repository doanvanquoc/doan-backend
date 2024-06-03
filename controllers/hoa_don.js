const service = require('../services/hoa_don');

const layDanhSachHoaDon = async (req, res) => {
  try {
    const result = await service.layDanhSachHoaDon();
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const capNhatBanTrongHoaDon = async (req, res) => {
  try {
    const { idHoaDon, idBan } = req.body;
    if (!idHoaDon || !idBan) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatBanTrongHoaDon(idHoaDon, idBan);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const capNhatTrangThai = async (req, res) => {
  try {
    const { idHoaDon, trangThai } = req.body;
    if (trangThai != 0 && (!idHoaDon || !trangThai)) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatTrangThai(idHoaDon, trangThai);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  layDanhSachHoaDon,
  capNhatBanTrongHoaDon,
  capNhatTrangThai
}