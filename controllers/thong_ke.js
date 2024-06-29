const service = require('../services/thong_ke');

const layTop5MonAn = async (req, res) => {
  try {
    const result = await service.layTop5MonAn();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  layTop5MonAn
}