const db = require('../models')
const io = require('../config/socket').getSocketIO()

const layDanhSachKhuVucCuaChiNhanh = (req) => new Promise(async (resolve, reject) => {
  try {
    console.log('req user: ', req.user)
    const danhSachKhuVuc = await db.KhuVuc.findAll(
      {
        where: {
          chi_nhanh: req.user.chi_nhanh
        },
        include: [{
          model: db.ChiNhanh,
          as: 'chi_nhanh_lam_viec'
        }]
      }
    )
    if (!danhSachKhuVuc) {
      resolve({ success: false, message: 'Không tìm thấy khu vực nào' })
    }
    resolve({ success: true, data: danhSachKhuVuc })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const layTatCaKhuVuc = () => new Promise(async (resolve, reject) => {
  try {
    const danhSachKhuVuc = await db.KhuVuc.findAll(
      {
        include: [{
          model: db.ChiNhanh,
          as: 'chi_nhanh_lam_viec'
        }]
      }
    )
    if (!danhSachKhuVuc) {
      resolve({ success: false, message: 'Không tìm thấy khu vực nào' })
    }
    resolve({ success: true, data: danhSachKhuVuc })
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatTrangThaiKhuVuc = (idKhuVuc, trangThai) => new Promise(async (resolve, reject) => {
  try {
    const khuVuc = await db.KhuVuc.findOne({ where: { id_khu_vuc: idKhuVuc } })
    if (khuVuc) {
      await db.KhuVuc.update({ trang_thai: trangThai }, { where: { id_khu_vuc: idKhuVuc } })
      io.emit('cap-nhat-trang-thai-khu-vuc', { idKhuVuc, trangThai })
      resolve({ success: true, message: 'Cập nhật trạng thái khu vực thành công' })
    } else {
      resolve({ success: false, message: 'Không tìm thấy khu vực' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const themKhuVuc = (khuVuc) => new Promise(async (resolve, reject) => {
  try {
    const khuVucMoi = await db.KhuVuc.create(khuVuc)
    if (khuVucMoi) {
      const newKhuVuc = await db.KhuVuc.findOne({
        where: { id_khu_vuc: khuVucMoi.id_khu_vuc }, include: [{
          model: db.ChiNhanh,
          as: 'chi_nhanh_lam_viec'
        }]
      })
      resolve({ success: true, message: 'Thêm khu vực thành công', data: newKhuVuc })
    } else {
      resolve({ success: false, message: 'Thêm khu vực thất bại' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

const capNhatKhuVuc = (idKhuVuc, khuVuc) => new Promise(async (resolve, reject) => {
  try {
    const khuVucDaCapNhat = await db.KhuVuc.update(khuVuc, { where: { id_khu_vuc: idKhuVuc } })
    if (khuVucDaCapNhat) {
      const khuVucVuaCapNhat = await db.KhuVuc.findOne({ where: { id_khu_vuc: idKhuVuc }, include: [{ model: db.ChiNhanh, as: 'chi_nhanh_lam_viec' }]})
      resolve({ success: true, message: 'Cập nhật khu vực thành công', data: khuVucVuaCapNhat })
    } else {
      resolve({ success: false, message: 'Cập nhật khu vực thất bại' })
    }
  } catch (error) {
    reject({ success: false, message: error.message })
  }
})

module.exports = {
  layDanhSachKhuVuc: layDanhSachKhuVucCuaChiNhanh,
  capNhatTrangThaiKhuVuc,
  layTatCaKhuVuc,
  themKhuVuc,
  capNhatKhuVuc
}

