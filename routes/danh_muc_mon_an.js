const express = require('express')
const controller = require('../controllers/danh_muc_mon_an')
const router = express.Router()

//schema cho danh mục món ăn
/**
 * @swagger
 * components:
 *   schemas:
 *     DanhMucMonAn:
 *       type: object
 *       properties:
 *         id_danh_muc:
 *           type: integer
 *           description: Mã danh mục
 *         ten_danh_muc:
 *           type: string
 *           description: Tên danh mục
 */

//swagger cho api lấy danh sách danh mục món ăn
/**
 * @swagger
 * /danh-muc-mon-an:
 *   get:
 *     summary: Lấy danh sách danh mục món ăn
 *     tags: [DanhMucMonAn]
 *     responses:
 *       200:
 *         description: Danh sách danh mục món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DanhMucMonAn'
 */

router.get('/', controller.layDanhSachDanhMucMonAn)

module.exports = router