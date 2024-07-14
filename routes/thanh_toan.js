const express = require('express')
const controller = require('../controllers/thanh_toan')
const router = express.Router()
const verify_token = require('../middlewares/verify_token')

router.post('/', controller.thanhToanChuyenKhoan)

module.exports = router