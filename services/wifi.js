const { WiFi } = require('../models');

const layDanhSachWiFi = async () => {
  return await WiFi.findAll();
};

const layWiFiTheoRole = async (role) => {
  return await WiFi.findOne({ where: { role } });
};

const capNhatWiFi = async (id, data) => {
  return await WiFi.update(data, {
    where: { id }
  });
};

const themWiFi = async (data) => {
  return await WiFi.create(data);
};

module.exports = { layDanhSachWiFi, layWiFiTheoRole, capNhatWiFi, themWiFi };
