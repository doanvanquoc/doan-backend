const db = require('../models');

const layDanhSachBan = () => new Promise(async (resolve, reject) => {
  try {
    const ban = await db.Ban.findAll();
    resolve({ success: true, data: ban });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = {layDanhSachBan}