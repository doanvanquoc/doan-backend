const express = require('express')
const controller = require('../controllers/mon_an')
const router = express.Router()

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

/**
 * @swagger
 * /mon-an/dat-mon:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags: [MonAn]
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
 *         description: Hóa đơn đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Kết quả của yêu cầu
 *                 data:
 *                   $ref: '#/components/schemas/HoaDon'
 *       400:
 *         description: Lỗi khi tạo hóa đơn
 */

/**
 * @swagger
 * /mon-an/tat-ca:
 *   get:
 *     summary: Lấy danh sách tất cả các món ăn
 *     tags: [MonAn]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonAn'
 *       500:
 *         description: Lỗi server
 */

//swagger cho mon-an/{id}
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
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MonAn'
 *       400:
 *         description: Lỗi khi lấy danh sách món ăn
 */


router.get('/tat-ca', controller.layDanhSachMonAn)
router.get('/:id', controller.layMonAnTheoDanhMuc)
router.post('/dat-mon', controller.datMon)

module.exports = router