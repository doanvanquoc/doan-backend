import express from 'express'
const app = express()
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import auth from './routes/auth'
import chucVu from './routes/chuc_vu'
app.get('/', (req, res) => {
  //reirect to /chuc-vu
  res.redirect('/chuc-vu')
})
app.use('/auth',  auth)
app.use('/chuc-vu', chucVu)

app.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})