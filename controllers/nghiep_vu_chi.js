const service = require('../services/nghiep_vu_chi');

const themThongKeChi = async (req, res) => {
  const {thong_ke_chi} = req.body
  if (!thong_ke_chi) {
    res.status(400).send({ message: 'Thiếu thông tin' });
    return;
  }
  try {
    const result = await service.themThongKeChi(thong_ke_chi, req.user);
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

const layDanhSachThongKeChi = async (req, res) => {
  try {
    const result = await service.layDanhSachThongKeChi();
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

const layDanhSachNghiepVuChi = async (req, res) => {
  try {
    const result = await service.layDanhSachNghiepVuChi();
    res.status(200).send(result);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  themThongKeChi,
  layDanhSachThongKeChi,
  layDanhSachNghiepVuChi
}
