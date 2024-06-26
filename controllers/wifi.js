const service = require('../services/wifi');

const layDanhSachWiFi = async (req, res) => {
  try {
    const result = await service.layDanhSachWiFi();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layWiFiTheoRole = async (req, res) => {
  try {
    const { role } = req.params;
    if (!role) {
      return res.status(400).json({ success: false, message: 'Thiếu role' });
    }
    const result = await service.layWiFiTheoRole(role);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatWiFi = async (req, res) => {
  try {
    const { id, ip_address, subnet_mask, gateway, role } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Thiếu id' });
    }
    const result = await service.capNhatWiFi(id, { ip_address, subnet_mask, gateway, role });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const themWiFi = async (req, res) => {
  try {
    const { ip_address, subnet_mask, gateway, role } = req.body;
    const result = await service.themWiFi({ ip_address, subnet_mask, gateway, role });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = { layDanhSachWiFi, layWiFiTheoRole, capNhatWiFi, themWiFi };
