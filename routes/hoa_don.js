const express = require('express')
const controller = require('../controllers/hoa_don')
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



// schema for HoaDon
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
 *         id_ban:
 *           type: integer
 *           description: Bàn
 *         tong_tien:
 *           type: number
 *           description: Tổng tiền
 *         ghi_chu:
 *           type: string
 *           desctiption: Ghi chú hóa đơn
 *         phuong_thuc_thanh_toan:
 *           type: string
 *           description: Phương thức thanh toán
 *     ChiTietHoaDon:
 *       type: object
 *       properties:
 *         id_mon_an:
 *           type: integer
 *           description: Mã món ăn
 *         so_luong:
 *           type: integer
 *           description: Số lượng
 *         thanh_tien:
 *           type: number
 *           description: Thành tiền
 *         ghi_chu:
 *           type: string
 *           desctiption: Ghi chú chi tiết hóa đơn
 *         thoi_gian:
 *           type: string
 *           format: date-time
 *           description: Thời gian
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
 
/**
 * @swagger
 * components:
 *   schemas:
 *     ThongTin:
 *       type: object
 *       properties:
 *         id_hoa_don:
 *           type: integer
 *           description: Mã hóa đơn
 *         gio_ra:
 *           type: string
 *           format: time
 *           description: Giờ ra
 *         phuong_thuc_thanh_toan:
 *           type: integer
 *           description: Phương thức thanh toán
 *         ghi_chu:
 *           type: string
 *           description: Ghi chú
 */


// GET all hoa_don thêm required auth header
/**
 * @swagger
 * /hoa-don:
 *   get:
 *     summary: Lấy danh sách hóa đơn
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HoaDon'
 */

// swagger cho router cap nhat ban trong hoa don thêm required auth header
/**
 * @swagger
 * /hoa-don/cap-nhat-ban:
 *   post:
 *     summary: Cập nhật bàn trong hóa đơn
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idHoaDon:
 *                 type: integer
 *                 description: Mã hóa đơn
 *               idBan:
 *                 type: integer
 *                 description: Mã bàn
 *     responses:
 *       200:
 *         description: Success
 */

// swagger cho router cap nhat trang thai thêm required auth header
/**
 * @swagger
 * /hoa-don/cap-nhat-trang-thai:
 *   post:
 *     summary: Cập nhật trạng thái hóa đơn
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idHoaDon:
 *                 type: integer
 *                 description: Mã hóa đơn
 *               trangThai:
 *                 type: integer
 *                 description: Trạng thái
 *     responses:
 *       200:
 *         description: Success
 */

// swagger cho router thanh toan thêm required auth header
/**
 * @swagger
 * /hoa-don/thanh-toan:
 *   post:
 *     summary: Thanh toán hóa đơn
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ThongTin'
 *     responses:
 *       200:
 *         description: Success
 */

// swagger cho router cap nhat phuong thuc thanh toan thêm required auth header
/**
 * @swagger
 * /hoa-don/cap-nhat-phuong-thuc-thanh-toan:
 *   post:
 *     summary: Cập nhật phương thức thanh toán
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idHoaDon:
 *                 type: integer
 *                 description: Mã hóa đơn
 *               idPhuongThuc:
 *                 type: integer
 *                 description: Mã phương thức thanh toán
 *     responses:
 *       200:
 *         description: Success
 */

// swagger cho router cap nhat tong tien thêm required auth header
/**
 * @swagger
 * /hoa-don/cap-nhat-tong-tien:
 *   post:
 *     summary: Cập nhật tổng tiền hóa đơn
 *     tags: [Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idHoaDon:
 *                 type: integer
 *                 description: Mã hóa đơn
 *               tongTien:
 *                 type: number
 *                 description: Tổng tiền
 *     responses:
 *       200:
 *         description: Success
 */


router.get('/', verify_token, controller.layDanhSachHoaDon)
router.post('/cap-nhat-ban', verify_token, controller.capNhatBanTrongHoaDon)
router.post('/cap-nhat-trang-thai', verify_token, controller.capNhatTrangThai)
router.post('/thanh-toan', verify_token, controller.thanhToan)
router.post('/cap-nhat-phuong-thuc-thanh-toan', verify_token, controller.capNhatPhuongThucThanhToan)
router.post('/cap-nhat-tong-tien', verify_token, controller.capNhatTongTien)

module.exports = router