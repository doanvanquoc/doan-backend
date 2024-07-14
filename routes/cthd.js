const express = require('express');
const controller = require('../controllers/cthd');
const verify_token = require('../middlewares/verify_token')

const router = express.Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// schema for ChiTietHoaDon
/**
 * @swagger
 * components:
 *   schemas:
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
 */

// schema for ChiTietHoaDon cap nhat danh sach cthd, thêm required auth header
/**
 * @swagger
 * /cthd:
 *   get:
 *     summary: Lấy danh sách chi tiết hóa đơn
 *     tags: [Chi Tiết Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách chi tiết hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChiTietHoaDon'
 */
// swagger cho api xoa-danh-sach-cthd, thêm required auth header
/**
 * @swagger
 * /cthd/xoa-danh-sach-cthd:
 *   post:
 *     summary: Xóa danh sách chi tiết hóa đơn
 *     tags: [Chi Tiết Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               danh_sach_id_cthd:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */

// swagger cho api cap-nhat-id-hoa-don thêm required auth header
/**
 * @swagger
 * /cthd/cap-nhat-id-hoa-don:
 *   put:
 *     summary: Cập nhật id hóa đơn
 *     tags: [Chi Tiết Hóa Đơn]
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
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */
// swagger cho api cap-nhat-danh-sach-cthd thêm required auth header
/**
 * @swagger
 * /cthd/cap-nhat-danh-sach-cthd:
 *   put:
 *     summary: Cập nhật danh sách chi tiết hóa đơn
 *     tags: [Chi Tiết Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               danh_sach_cthd:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ChiTietHoaDon'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */

// swagger cho api cap-nhat-trang-thai-cthd thêm required auth header
/**
 * @swagger
 * /cthd/cap-nhat-trang-thai-cthd:
 *   put:
 *     summary: Cập nhật trạng thái chi tiết hóa đơn
 *     tags: [Chi Tiết Hóa Đơn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_cthd:
 *                 type: integer
 *                 description: Mã chi tiết hóa đơn
 *               trang_thai:
 *                 type: integer
 *                 description: Trạng thái
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */

router.post('/xoa-danh-sach-cthd', verify_token, controller.xoaDanhSachCTHD);
router.put('/cap-nhat-id-hoa-don', verify_token, controller.capNhatIdHoaDon);
router.put('/cap-nhat-danh-sach-cthd', verify_token, controller.capNhatDanhSachCTHD);
router.put('/cap-nhat-trang-thai-cthd', verify_token, controller.capNhatTrangThaiCTHD);

module.exports = router;