const express = require('express')
const app = express()
const setupSwagger = require('./swagger');
const cors = require('cors')
const PORT = process.env.PORT || 8080

app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const auth = require('./routes/auth')
const chucVu = require('./routes/chuc_vu')
const danhMucMonAn = require('./routes/danh_muc_mon_an')
const monAn = require('./routes/mon_an')
const ban = require('./routes/ban')
const khuVuc = require('./routes/khu_vuc')

setupSwagger(app);


app.get('/', (req, res) => {
  res.redirect('/api-docs')
})
app.use('/auth', auth)
app.use('/chuc-vu', chucVu)
app.use('/danh-muc-mon-an', danhMucMonAn)
app.use('/mon-an', monAn)
app.use('/ban', ban)
app.use('/khu-vuc', khuVuc)

app.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})