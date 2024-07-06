const danhMucMonAnService = require('../services/danh_muc_mon_an');

const layDanhSachDanhMucMonAn = async (req, res) => {
  try {
    const result = await danhMucMonAnService.layDanhSachDanhMucMonAn();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const themNhomMon = async (req, res) => {
  try {
    const { tenNhom } = req.body;
    if (!tenNhom) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    const result = await danhMucMonAnService.themNhomMon(tenNhom);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatNhomMon = async (req, res) => {
  try {
    const { idNhom, tenNhom } = req.body;
    if (!idNhom || !tenNhom) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    const result = await danhMucMonAnService.capNhatNhomMon(idNhom, tenNhom);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
} 

module.exports = {
  layDanhSachDanhMucMonAn,
  themNhomMon,
  capNhatNhomMon
}