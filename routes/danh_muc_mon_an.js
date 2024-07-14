const express = require('express')
const controller = require('../controllers/danh_muc_mon_an')
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

//swagger cho api lấy danh sách danh mục món ăn thêm require header Authorization
/**
 * @swagger
 * /danh-muc-mon-an:
 *   get:
 *     summary: Lấy danh sách danh mục món ăn
 *     tags: [Nhóm Món]
 *     security:
 *       - BearerAuth: []
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

//swagger cho api thêm nhóm món
/**
 * @swagger
 * /danh-muc-mon-an:
 *   post:
 *     summary: Thêm nhóm món
 *     tags: [Nhóm Món]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_nhom:
 *                 type: string
 *                 description: Tên nhóm món
 *     responses:
 *       200:
 *         description: Nhóm món đã thêm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhMucMonAn'
 */

//swagger cho api cập nhật nhóm món
/**
 * @swagger
 * /danh-muc-mon-an:
 *   put:
 *     summary: Cập nhật nhóm món
 *     tags: [Nhóm Món]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_nhom:
 *                 type: integer
 *                 description: Mã nhóm món
 *               ten_nhom:
 *                 type: string
 *                 description: Tên nhóm món
 *     responses:
 *       200:
 *         description: Nhóm món đã cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DanhMucMonAn'
 */

router.get('/', verify_token, controller.layDanhSachDanhMucMonAn)
router.post('/', verify_token, controller.themNhomMon)
router.put('/', verify_token, controller.capNhatNhomMon)

module.exports = router