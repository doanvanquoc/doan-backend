const PayOS = require("@payos/node");
const dotenv = require('dotenv')
dotenv.config()

const payos = new PayOS(process.env.CLIENT_ID, process.env.API_KEY, process.env.CHECKSUM_KEY);

const thanhToanChuyenKhoan = (tong_tien, mo_ta, res) => new Promise(async (resolve, reject) => {
  try {
    const orderCode = Math.floor(Math.random() * 1000000)
    const order = {
      amount: tong_tien,
      description: mo_ta,
      orderCode: orderCode,
      returnUrl: "http://localhost:3000/success.html",
      cancelUrl: "http://localhost:3000/cancel.html",
    }
    const payment = await payos.createPaymentLink(order)
    resolve({succes: true, message: 'Chuyển hướng đến trang thanh toán', link: payment.checkoutUrl})
    // res.redirect(303, payment.checkoutUrl)
  } catch (error) {
reject({succes: false, message: error.message})
  }
})

module.exports = {thanhToanChuyenKhoan}
