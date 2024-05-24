const express = require('express')
const controller = require('../controllers/danh_muc_mon_an')
const router = express.Router()

router.get('/', controller.layDanhSachDanhMucMonAn)

module.exports = router