const express = require('express');
const chucVuController = require('../controllers/chuc_vu');
const router = express.Router();

router.get('/', chucVuController.layDanhSachChucVu);

module.exports = router;