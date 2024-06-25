const service = require('../services/phuong_thuc_thanh_toan')

const layDanhSachPTTT = async (req, res) => {
  try {
    const result = await service.layDanhSachPTTT()
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

module.exports = { layDanhSachPTTT }