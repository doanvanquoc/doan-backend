const db = require('../models');
const io = require('../config/socket').getSocketIO();
const layDanhSachBan = () => new Promise(async (resolve, reject) => {
  try {
    const ban = await db.Ban.findAll({
      include: [
        {
          model: db.KhuVuc,
          as: 'khu_vuc',
          where: {
            trang_thai: 1
          }
        }
      ]
    
    });
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

const capNhatTrangThaiBan = (idBan, trangThai) => new Promise(async (resolve, reject) => {
  try {
    const ban = await db.Ban.findOne({ where: { id_ban: idBan } })
    if (ban) {
      await db.Ban.update({ trang_thai: trangThai }, { where: { id_ban: idBan } })
      io.emit('cap-nhat-trang-thai-ban', { idBan, trangThai })
      resolve({ success: true, message: 'Cập nhật trạng thái bàn thành công' })
    }
    else {
      resolve({ success: false, message: 'Không tìm thấy bàn' })
    }
  } catch (error) {
    reject({ success: false, message: error })
  }
})

module.exports = { layDanhSachBan, layBanTheoKhuVuc, capNhatTrangThaiBan }