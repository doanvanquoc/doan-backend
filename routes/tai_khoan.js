const express = require('express')
const controller = require('../controllers/tai_khoan')
const verify_token = require('../middlewares/verify_token')
const router = express.Router()

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

router.post('/dang-ky', controller.register)
router.post('/dang-nhap', controller.login)
router.post('/dang-nhap-bang-khuon-mat', controller.dangNhapBangKhuonMat)

module.exports = router