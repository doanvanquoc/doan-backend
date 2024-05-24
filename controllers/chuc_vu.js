const chucVuService = require('../services/chuc_vu');

const layDanhSachChucVu = async (req, res) => {
  try {
    const result = await chucVuService.layDanhSachChucVu();
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  layDanhSachChucVu
}