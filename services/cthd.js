const db = require('../models')

const xoaDanhSachCTHD = (danhSachId, idHoaDon) => new Promise(async (resolve, reject) => {
  try {
    // Log the inputs
    console.log('danhSachId:', danhSachId);
    console.log('idHoaDon:', idHoaDon);

    // Destroy each cthd in danhSachId array where idHoaDon = idHoaDon
    for (let i = 0; i < danhSachId.length; i++) {
      const result = await db.ChiTietHoaDon.destroy({
        where: {
          id_cthd: danhSachId[i],
          id_hoa_don: idHoaDon
        }
      });

      // Log the result of each destroy operation
      console.log(`Deleted id_cthd: ${danhSachId[i]}, affected rows: ${result}`);
    }

    // Log success message
    console.log('Xóa thành công');

    resolve({ success: true, message: 'Xóa thành công' });
  } catch (error) {
    // Log the error
    console.error('Error:', error);

    reject({ success: false, message: error.message });
  }
});

const capNhatIdHoaDon = (idCTHD, idHoaDon) => new Promise (async (resolve, reject) => {
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


module.exports = {
  xoaDanhSachCTHD,
  capNhatIdHoaDon
}