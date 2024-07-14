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
      },
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

const themBan = (ban) => new Promise(async (resolve, reject) => {
  try {
    const banMoi = await db.Ban.create(ban)
    if (banMoi) {
      const banVuaThem = await db.Ban.findOne({ where: { id_ban: banMoi.id_ban }, include: [{ model: db.KhuVuc, as: 'khu_vuc' }]})
      resolve({ success: true, message: 'Thêm bàn thành công', data: banVuaThem })
    } else {
      resolve({ success: false, message: 'Thêm bàn thất bại' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatBan = (idBan, ban) => new Promise(async (resolve, reject) => {
  try {
    const banDaCapNhat = await db.Ban.update(ban, { where: { id_ban: idBan } })
    if (banDaCapNhat) {
      const banVuaCapNhat = await db.Ban.findOne({ where: { id_ban: idBan }, include: [{ model: db.KhuVuc, as: 'khu_vuc' }]})
      resolve({ success: true, message: 'Cập nhật bàn thành công', data: banVuaCapNhat })
    } else {
      resolve({ success: false, message: 'Cập nhật bàn thất bại' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const xoaBan = (idBan) => new Promise(async (resolve, reject) => {
  try {
    const banDaXoa = await db.Ban.destroy({ where: { id_ban: idBan } })
    if (banDaXoa) {
      resolve({ success: true, message: 'Xóa bàn thành công' })
    } else {
      resolve({ success: false, message: 'Xóa bàn thất bại' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

module.exports = { layDanhSachBan, layBanTheoKhuVuc, capNhatTrangThaiBan, themBan, capNhatBan, xoaBan}