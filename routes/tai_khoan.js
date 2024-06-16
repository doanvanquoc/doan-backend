const express = require('express')
const controller = require('../controllers/tai_khoan')
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

// schema for TaiKhoan
/**
 * @swagger
 * components:
 *   schemas:
 *     TaiKhoan:
 *       type: object
 *       properties:
 *         tai_khoan:
 *           type: string
 *           description: Tên tài khoản
 *         mat_khau:
 *           type: string
 *           description: Mật khẩu
 *         email:
 *           type: string
 *           description: Email
 *         chuc_vu:
 *           type: string
 *           description: Chức vụ
 */

//scheme for TaiKhoanLogin
/**
 * @swagger
 * components:
 *   schemas:
 *     TaiKhoanLogin:
 *       type: object
 *       properties:
 *         tai_khoan:
 *           type: string
 *           description: Tên tài khoản
 *         mat_khau:
 *           type: string
 *           description: Mật khẩu
 */

// swagger for dang-nhap
/**
 * @swagger
 * /tai-khoan/dang-nhap:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaiKhoanLogin'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Đăng nhập thất bại
 */

// swagger cho lich-su-dat-mon
/**
 * @swagger
 * /tai-khoan/lich-su-dat-mon:
 *   get:
 *     summary: Lịch sử đặt món
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy lịch sử đặt món thành công
 *       400:
 *         description: Lấy lịch sử đặt món thất bại
 */

router.post('/dang-ky', controller.register)
router.post('/dang-nhap', controller.login)
router.post('/dang-nhap-bang-khuon-mat', controller.dangNhapBangKhuonMat)
router.get('/lich-su-dat-mon', verify_token, controller.layLichSuDatMon)

module.exports = router