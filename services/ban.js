const db = require('../models');
const layDanhSachBan = () => new Promise(async (resolve, reject) => {
  try {
    const ban = await db.Ban.findAll();
    resolve({ success: true, data: ban });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const layBanTheoKhuVuc = (id_khu_vuc) => new Promise(async (resolve, reject) => {
  try {
    const ban = await db.Ban.findAll({
      where: {
        id_khu_vuc
      }
    });
    if (!ban || ban.length === 0) {
      resolve({ success: false, message: 'Không tìm thấy bàn nào' });
    }
    resolve({ success: true, data: ban });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

module.exports = { layDanhSachBan, layBanTheoKhuVuc }