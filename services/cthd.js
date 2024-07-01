const db = require('../models')
const io = require('../config/socket').getSocketIO();

const xoaDanhSachCTHD = (danhSachId, idHoaDon) => new Promise(async (resolve, reject) => {
  try {
    // Log the inputs

    // Destroy each cthd in danhSachId array where idHoaDon = idHoaDon
    for (let i = 0; i < danhSachId.length; i++) {
      const result = await db.ChiTietHoaDon.destroy({
        where: {
          id_cthd: danhSachId[i],
          id_hoa_don: idHoaDon
        }
      });

      // Log the result of each destroy operation
    }

    // Log success message

    resolve({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    // Log the error
    console.error('Error:', error);

    reject({ success: false, message: error.message });
  }
});

const capNhatIdHoaDon = (idCTHD, idHoaDon) => new Promise(async (resolve, reject) => {
  try {
    //cap nhat id hoa don trong bang chi tiet hoa don
    const result = await db.ChiTietHoaDon.update({
      id_hoa_don: idHoaDon
    }, {
      where: {
        id_cthd: idCTHD
      }
    });
    if (result[0] === 0) {
      resolve({ success: false, message: 'Không tìm thấy cthd' });
    }
    else {
      resolve({ success: true, message: 'Cập nhật thành công' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
})

const capNhatDanhSachCTHD = (danhSachCTHD, idHoaDon) => new Promise(async (resolve, reject) => {
  try {
    let tongTien = 0;

    for (let i = 0; i < danhSachCTHD.length; i++) {
      const result = await db.ChiTietHoaDon.update({
        so_luong: danhSachCTHD[i].so_luong,
        thanh_tien: danhSachCTHD[i].thanh_tien
      }, {
        where: {
          id_cthd: danhSachCTHD[i].id_cthd
        }
      });

      tongTien += danhSachCTHD[i].thanh_tien;
    }

    await db.HoaDon.update({
      tong_tien: tongTien
    }, {
      where: {
        id_hoa_don: idHoaDon
      }
    });

    resolve({ success: true, message: 'Cập nhật thành công' });
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});

const capNhatTrangThaiCTHD = (idCTHD, trangThai) => new Promise(async (resolve, reject) => {
  try {
    const result = await db.ChiTietHoaDon.update({
      trang_thai: trangThai
    }, {
      where: {
        id_cthd: idCTHD
      }
    });

    if (result[0] === 0) {
      resolve({ success: false, message: 'Không tìm thấy cthd' });
    }
    else {
      io.emit('cap-nhat-trang-thai-cthd', { idCTHD, trangThai });
      console.log('Emit:', { idCTHD, trangThai });
      resolve({ success: true, message: 'Cập nhật thành công' });
    }
  } catch (error) {
    reject({ success: false, message: error.message });
  }
});




module.exports = {
  xoaDanhSachCTHD,
  capNhatIdHoaDon,
  capNhatDanhSachCTHD,
  capNhatTrangThaiCTHD
}