const express = require('express');
const chucVuController = require('../controllers/chuc_vu');
const router = express.Router();

//schema cho chức vụ
/**
 * @swagger
 * components:
 *   schemas:
 *     ChucVu:
 *       type: object
 *       properties:
 *         id_chuc_vu:
 *           type: integer
 *           description: Mã chức vụ
 *         ten_chuc_vu:
 *           type: string
 *           description: Tên chức vụ
 */

//swagger cho api lấy danh sách chức vụ
/**
 * @swagger
 * /chuc-vu:
 *   get:
 *     summary: Lấy danh sách chức vụ
 *     tags: [ChucVu]
 *     responses:
 *       200:
 *         description: Danh sách chức vụ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChucVu'
 */

router.get('/', chucVuController.layDanhSachChucVu);

module.exports = router;