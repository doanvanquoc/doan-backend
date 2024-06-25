const service = require('../services/nghiep_vu_chi');

const themThongKeChi = async (req, res) => {
  const {thongKeChi} = req.body
  if (!thongKeChi) {
    res.status(400).send({ message: 'Thiếu thông tin' });
    return;
  }
  try {
    const result = await service.themThongKeChi(thongKeChi, req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

const layDanhSachThongKeChi = async (req, res) => {
  try {
    const result = await service.layDanhSachThongKeChi();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

const layDanhSachNghiepVuChi = async (req, res) => {
  try {
    const result = await service.layDanhSachNghiepVuChi();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  themThongKeChi,
  layDanhSachThongKeChi,
  layDanhSachNghiepVuChi
}
