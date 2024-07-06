const chucVuService = require('../services/chuc_vu');

const layDanhSachChucVu = async (req, res) => {
  try {
    const result = await chucVuService.layDanhSachChucVu();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const themChucVu = async (req, res) => {
  try {
    const result = await chucVuService.themChucVu(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatChucVu = async (req, res) => {
  try {
    const result = await chucVuService.capNhatChucVu(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachChucVu,
  themChucVu,
  capNhatChucVu
}