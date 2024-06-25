const express = require('express');
const router = express.Router();
const controller = require('../controllers/phuong_thuc_thanh_toan');
const verify_token = require('../middlewares/verify_token');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Define the schema for PhuongThucThanhToan
/**
 * @swagger
 * definitions:
 *   PhuongThucThanhToan:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       ten:
 *         type: string
 */

//swagger for router GET /phuong_thuc_thanh_toan
/**
 * @swagger
 * /phuong_thuc_thanh_toan:
 *   get:
 *     tags:
 *       - Phương Thức Thanh Toán
 *     description: Lấy danh sách phương thức thanh toán
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách phương thức thanh toán thành công
 *       500:
 *         description: Lấy danh sách phương thức thanh toán thất bại
 */

router.get('/', verify_token, controller.layDanhSachPTTT);

module.exports = router;