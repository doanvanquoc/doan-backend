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
    res.status(500).send({ message: error.message });
  }
}

const layDanhSachThongKeChi = async (req, res) => {
  try {
    const result = await service.layDanhSachThongKeChi();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  themThongKeChi,
  layDanhSachThongKeChi
}
