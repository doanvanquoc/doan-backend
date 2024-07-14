const service = require('../services/cthd');

const xoaDanhSachCTHD = async (req, res) => {
  try {
    const { danh_sach_id, id_hoa_don } = req.body;
    if (!danh_sach_id || !id_hoa_don) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.xoaDanhSachCTHD(danh_sach_id, id_hoa_don);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatIdHoaDon = async (req, res) => {
  try {
    const { id_cthd, id_hoa_don } = req.body;
    if (!id_cthd || !id_hoa_don) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatIdHoaDon(id_cthd, id_hoa_don);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatDanhSachCTHD = async (req, res) => {
  try {
    const { danh_sach_cthd, id_hoa_don } = req.body;
    if (!danh_sach_cthd, !id_hoa_don) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatDanhSachCTHD(danh_sach_cthd, id_hoa_don);
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

const capNhatTrangThaiCTHD = async (req, res) => {
  try {
    const { id_cthd, trang_thai } = req.body;
    console.log(id_cthd, trang_thai);
    if (trang_thai != 0 && (!id_cthd || !trang_thai)) {
      return res.status(400).json('Thiếu thông tin');
    }
    const result = await service.capNhatTrangThaiCTHD(id_cthd, trang_thai);
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