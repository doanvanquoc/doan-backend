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


module.exports = {
  xoaDanhSachCTHD
}