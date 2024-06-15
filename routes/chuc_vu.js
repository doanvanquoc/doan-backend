const express = require('express');
const chucVuController = require('../controllers/chuc_vu');
const verify_token = require('../middlewares/verify_token')

const router = express.Router();

//swagger cho security schema Authorization header
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

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

//swagger cho api lấy danh sách chức vụ, thêm require header Authorization
/**
 * @swagger
 * /chuc-vu:
 *   get:
 *     summary: Lấy danh sách chức vụ
 *     tags: [ChucVu]
 *     security:
 *       - BearerAuth: []
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

router.get('/', verify_token, chucVuController.layDanhSachChucVu);

module.exports = router;