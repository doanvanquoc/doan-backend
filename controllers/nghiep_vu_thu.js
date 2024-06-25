const service = require('../services/nghiep_vu_thu');

const themThongKeThu = async (req, res) => {
  const {thongKeThu} = req.body
  if (!thongKeThu) {
    res.status(400).send({ message: 'Thiếu thông tin' });
    return;
  }
  try {
    const result = await service.themThongKeThu(thongKeThu, req.user);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

const layDanhSachThongKeThu = async (req, res) => {
  try {
    const result = await service.layDanhSachThongKeThu();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

const layDanhSachNghiepVuThu = async (req, res) => {
  try {
    const result = await service.layDanhSachNghiepVuThu();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  themThongKeThu,
  layDanhSachThongKeThu,
  layDanhSachNghiepVuThu
}
