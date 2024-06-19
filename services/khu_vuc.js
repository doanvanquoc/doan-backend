const db = require('../models')
const io = require('../config/socket').getSocketIO()

const layDanhSachKhuVuc = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachKhuVuc = await db.KhuVuc.findAll()
    if (!danhSachKhuVuc) {
      resolve({success: false, message: 'Không tìm thấy khu vực nào'})
    }
    resolve({success: true, data: danhSachKhuVuc})
  } catch (error) {
    reject({success: false, message: error.message})
  }
})

const capNhatTrangThaiKhuVuc = (idKhuVuc, trangThai) => new Promise(async (resolve, reject) => {
  try {
    const khuVuc = await db.KhuVuc.findOne({where: {id_khu_vuc: idKhuVuc}})
    if (khuVuc) {
      await db.KhuVuc.update({trang_thai: trangThai}, {where: {id_khu_vuc: idKhuVuc}})
      io.emit('cap-nhat-trang-thai-khu-vuc', {idKhuVuc, trangThai})
      resolve({success: true, message: 'Cập nhật trạng thái khu vực thành công'})
    } else {
      resolve({success: false, message: 'Không tìm thấy khu vực'})
    }
  } catch (error) {
    reject({success: false, message: error.message})
  }
})

module.exports = {
  layDanhSachKhuVuc,
  capNhatTrangThaiKhuVuc
}

