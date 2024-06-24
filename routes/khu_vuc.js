const express = require('express')  
const controller = require('../controllers/khu_vuc')
const verify_token = require('../middlewares/verify_token')

const router = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

//schema cho khu vực
/**
 * @swagger
 * components:
 *   schemas:
 *     KhuVuc:
 *       type: object
 *       properties:
 *         id_khu_vuc:
 *           type: integer
 *           description: Mã khu vực
 *         ten_khu_vuc:
 *           type: string
 *           description: Tên khu vực
 */

//swagger cho api lấy danh sách khu vực thêm required auth header
/**
 * @swagger
 * /khu-vuc:
 *   get:
 *     summary: Lấy danh sách khu vực
 *     tags: [Khu Vực]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách khu vực
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KhuVuc'
 */

//swagger cho api cập nhật trạng thái khu vực thêm required auth header
/**
 * @swagger
 * /khu-vuc/cap-nhat-trang-thai:
 *   post:
 *     summary: Cập nhật trạng thái khu vực
 *     tags: [Khu Vực]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idKhuVuc:
 *                 type: integer
 *                 description: Mã khu vực
 *               trangThai:
 *                 type: integer
 *                 description: Tình trạng
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái khu vực thành công
 *       400:
 *         description: Lỗi khi cập nhật trạng thái khu vực
 */

router.get('/', verify_token, controller.layDanhSachKhuVuc)
router.post('/cap-nhat-trang-thai', verify_token, controller.capNhatTrangThaiKhuVuc)

module.exports = router