const danhMucMonAnService = require('../services/danh_muc_mon_an');

const layDanhSachDanhMucMonAn = async (req, res) => {
  try {
    const result = await danhMucMonAnService.layDanhSachDanhMucMonAn();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachDanhMucMonAn
}