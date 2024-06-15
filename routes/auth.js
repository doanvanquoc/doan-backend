const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/verify_token')

router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Xác minh token thành công' })
})

module.exports = router