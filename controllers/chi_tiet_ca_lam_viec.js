const service = require('../services/chi_tiet_ca_lam_viec');

const moCa = async (req, res) => {
  try {
    const result = await service.moCa(req.body, req.user);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  moCa
};