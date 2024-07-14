const service = require('../services/thanh_toan')

const thanhToanChuyenKhoan = async (req, res) => {
  const { tong_tien, mo_ta } = req.body
  if (!tong_tien || !mo_ta) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin thanh toán' });
  }
  try {
    const result = await service.thanhToanChuyenKhoan(tong_tien, mo_ta, res)
    res.status(200).json(result)
  } catch (error) {
    res.send(error)
  }
}

module.exports = { thanhToanChuyenKhoan }