import chucVuService from '../services/chuc_vu.js';

const layDanhSachChucVu = async (req, res) => {
  try {
    const result = await chucVuService.layDanhSachChucVu();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default {
  layDanhSachChucVu
}