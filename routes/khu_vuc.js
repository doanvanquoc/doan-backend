const express = require('express')  
const controller = require('../controllers/khu_vuc')
const verify_token = require('../middlewares/verify_token')

const router = express.Router()

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

//swagger cho api lấy danh sách khu vực
/**
 * @swagger
 * /khu-vuc:
 *   get:
 *     summary: Lấy danh sách khu vực
 *     tags: [KhuVuc]
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

router.get('/', verify_token, controller.layDanhSachKhuVuc)

module.exports = router