const express = require('express')
const controller = require('../controllers/mon_an')
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

/**
 * @swagger
 * components:
 *   schemas:
 *     HoaDon:
 *       type: object
 *       properties:
 *         thu_ngan:
 *           type: string
 *           description: Tên nhân viên thu ngân
 *         ngay:
 *           type: string
 *           format: date
 *           description: Ngày lập hóa đơn
 *         gio_vao:
 *           type: string
 *           format: time
 *           description: Giờ vào
 *         gio_ra:
 *           type: string
 *           format: time
 *           description: Giờ ra
 *         ban:
 *           type: string
 *         id_ban:
 *           type: integer
 *           description: Bàn
 *         tong_tien:
 *           type: number
 *           description: Tổng tiền
 *         phuong_thuc_thanh_toan:
 *           type: integer
 *           description: Phương thức thanh toán
 *     ChiTietHoaDon:
 *       type: object
 *       properties:
 *         id_mon_an:
 *           type: integer
 *           description: Mã món ăn
 *         id_hoa_don:
 *           type: integer
 *           description: Mã hóa đơn
 *         so_luong:
 *           type: integer
 *           description: Số lượng
 *         thanh_tien:
 *           type: number
 *           description: Thành tiền
 *     MonAn:
 *       type: object
 *       properties:
 *         id_mon_an:
 *           type: integer
 *           description: Mã món ăn
 *         ten_mon_an:
 *           type: string
 *           description: Tên món ăn
 *         don_gia:
 *          type: number
 *          description: Đơn giá
 *         don_vi_tinh:
 *          type: string
 *          description: Đơn vị tính
 *         mo_ta:
 *          type: string
 *          description: Mô tả
 *         id_danh_muc:
 *          type: integer
 *          description: Mã danh mục
 *         trang_thai:
 *          type: integer
 *          description: Trạng thái
 * 
 */

//swagger cho mon-an/dat-mon thêm require auth header schema su dung hoa-don schema
/**
 * @swagger
 * /mon-an/dat-mon:
 *   post:
 *     summary: Đặt món
 *     tags: [MonAn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hoaDon:
 *                 $ref: '#/components/schemas/HoaDon'
 *               danhSachChiTietHoaDon:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ChiTietHoaDon'
 *     responses:
 *       200:
 *         description: Món đã được đặt
 *       400:
 *         description: Lỗi khi đặt món
 */


//swagger cho mon-an/tat-ca thêm require auth header schema
/**
 * @swagger
 * /mon-an/tat-ca:
 *   get:
 *     summary: Lấy danh sách món ăn
 *     tags: [MonAn]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách món ăn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonAn'
 *       400:
 *         description: Lỗi khi lấy danh sách món ăn
 */

//swagger cho mon-an/{id} thêm require auth header schema
/**
 * @swagger
 * /mon-an/{id}:
 *   get:
 *     summary: Lấy danh sách món ăn theo danh mục
 *     tags: [MonAn]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mã danh mục món ăn
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách món ăn theo danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonAn'
 *       400:
 *         description: Lỗi khi lấy danh sách món ăn theo danh mục
 */

//swagger co su dung hoa-don schema
/**
 * @swagger
 * /mon-an/them-mon-vao-hoa-don-da-co:
 *   post:
 *     summary: Thêm món vào hóa đơn đã có
 *     tags: [MonAn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_hoa_don:
 *                 type: integer
 *                 description: Mã hóa đơn
 *               danhSachChiTietHoaDon:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ChiTietHoaDon'
 *     responses:
 *       200:
 *         description: Món đã được thêm vào hóa đơn
 *       400:
 *         description: Lỗi khi thêm món vào hóa đơn
 */






router.get('/tat-ca', verify_token, controller.layDanhSachMonAn)
router.get('/:id', verify_token, controller.layMonAnTheoDanhMuc)
router.post('/dat-mon', verify_token, controller.datMon)
router.post('/them-mon-vao-hoa-don-da-co', verify_token, controller.themMonVaoHoaDonDaCo)

module.exports = router