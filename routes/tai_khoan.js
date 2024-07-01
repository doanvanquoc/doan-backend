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
 *         id_chuc_vu:
 *           type: integer
 *           description: ID chức vụ
 *         ca_lam_viec:
 *           type: integer
 *           description: Id ca làm việc
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

// swagger cho doi-mat-khau
/**
 * @swagger
 * /tai-khoan/doi-mat-khau:
 *   post:
 *     summary: Đổi mật khẩu
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mat_khau_cu:
 *                 type: string
 *               mat_khau_moi:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *       400:
 *         description: Đổi mật khẩu thất bại
 */

// swagger cho dang-ky
/**
 * @swagger
 * /tai-khoan/dang-ky:
 *   post:
 *     summary: Đăng ký
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaiKhoan'
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Đăng ký thất bại
 */

router.post('/dang-ky', controller.dangKy)
router.post('/dang-nhap', controller.dangNhap)
router.post('/dang-nhap-bang-khuon-mat', controller.dangNhapBangKhuonMat)
router.get('/lich-su-dat-mon', verify_token, controller.layLichSuDatMon)
router.post('/doi-mat-khau', verify_token, controller.doiMatKhau)
router.post('/dang-nhap-admin', controller.dangNhapAdmin)

module.exports = router