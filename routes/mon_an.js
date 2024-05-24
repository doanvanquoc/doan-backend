const express = require('express')
const controller = require('../controllers/mon_an')
const router = express.Router()

router.get('/tat-ca', controller.layDanhSachMonAn)
router.get('/:id', controller.layMonAnTheoDanhMuc)

module.exports = router