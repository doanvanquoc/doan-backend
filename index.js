const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const auth = require('./routes/auth')
const chucVu = require('./routes/chuc_vu')
const danhMucMonAn = require('./routes/danh_muc_mon_an')
const monAn = require('./routes/mon_an')

app.get('/', (req, res) => {
  //render html
  res.send('<h1>Chưa có document cho API này</h1>')
})
app.use('/auth', auth)
app.use('/chuc-vu', chucVu)
app.use('/danh-muc-mon-an', danhMucMonAn)
app.use('/mon-an', monAn)

app.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})