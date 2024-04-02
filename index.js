import express from 'express'
import db from './models'

const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import auth from './routes/auth'

app.use('/auth', auth)

app.listen(PORT, () => {
  console.log('Server đang chạy tại cổng ' + PORT)
})