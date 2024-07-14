const service = require('../services/nghiep_vu_thu');

const themThongKeThu = async (req, res) => {
  const {thong_ke_thu} = req.body
  if (!thong_ke_thu) {
    res.status(400).send({ message: 'Thiếu thông tin' });
    return;
  }
  try {
    const result = await service.themThongKeThu(thong_ke_thu, req.user);
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

const layDanhSachThongKeThu = async (req, res) => {
  try {
    const result = await service.layDanhSachThongKeThu();
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

const layDanhSachNghiepVuThu = async (req, res) => {
  try {
    const result = await service.layDanhSachNghiepVuThu();
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  themThongKeThu,
  layDanhSachThongKeThu,
  layDanhSachNghiepVuThu
}
