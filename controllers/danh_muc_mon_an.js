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
    const { ten_nhom } = req.body;
    if (!ten_nhom) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    const result = await danhMucMonAnService.themNhomMon(ten_nhom);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatNhomMon = async (req, res) => {
  try {
    const { id_nhom, ten_nhom } = req.body;
    if (!id_nhom || !ten_nhom) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
    }
    const result = await danhMucMonAnService.capNhatNhomMon(id_nhom, ten_nhom);
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