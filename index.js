const express = require('express')
const app = express()
const server = require('http').createServer(app)
const setupSwagger = require('./swagger');
const cors = require('cors')
const PORT = process.env.PORT || 8080
const { initializeSocket } = require('./config/socket')

initializeSocket(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('D:/anh'));
app.use(express.static('public'))


const auth = require('./routes/auth')
const taiKhoan = require('./routes/tai_khoan')
const chucVu = require('./routes/chuc_vu')
const danhMucMonAn = require('./routes/danh_muc_mon_an')
const monAn = require('./routes/mon_an')
const ban = require('./routes/ban')
const khuVuc = require('./routes/khu_vuc')
const hoadon = require('./routes/hoa_don')
const cthd = require('./routes/cthd')
const caLamViec = require('./routes/ca_lam_viec')
const chi = require('./routes/nghiep_vu_chi')
const thu = require('./routes/nghiep_vu_thu')
const pttt = require('./routes/phuong_thuc_thanh_toan')
const thongKe = require('./routes/thong_ke')
const chiNhanh = require('./routes/chi_nhanh')
const thanhToan = require('./routes/thanh_toan')

setupSwagger(app);


app.get('/', (req, res) => {
  res.redirect('/api-docs')
})
app.use('/kiem-tra-token', auth)
app.use('/tai-khoan', taiKhoan)
app.use('/chuc-vu', chucVu)
app.use('/danh-muc-mon-an', danhMucMonAn)
app.use('/mon-an', monAn)
app.use('/ban', ban)
app.use('/khu-vuc', khuVuc)
app.use('/hoa-don', hoadon)
app.use('/cthd', cthd)
app.use('/ca-lam-viec', caLamViec)
app.use('/chi', chi)
app.use('/thu', thu)
app.use('/phuong-thuc-thanh-toan', pttt)
app.use('/thong-ke', thongKe)
app.use('/chi-nhanh', chiNhanh)
app.use('/thanh-toan', thanhToan)

server.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})