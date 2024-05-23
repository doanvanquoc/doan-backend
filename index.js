const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const auth = require('./routes/auth')
const chucVu = require('./routes/chuc_vu')
app.get('/', (req, res) => {
  //reirect to /chuc-vu
  res.redirect('/chuc-vu')
})
app.use('/auth',  auth)
app.use('/chuc-vu', chucVu)

app.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})