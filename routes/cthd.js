const express = require('express');
const controller = require('../controllers/cthd');
const router = express.Router();

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

// swagger cho api xoa-danh-sach-cthd
/**
 * @swagger
 * /cthd/xoa-danh-sach-cthd:
 *   post:
 *     summary: Xóa danh sách chi tiết hóa đơn
 *     tags: [ChiTietHoaDon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               danhSachId:
 *                 type: array
 *                 items:
 *                   type: integer
 *               idHoaDon:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: Thiếu thông tin
 *       500:
 *         description: Lỗi server
 */

router.post('/xoa-danh-sach-cthd', controller.xoaDanhSachCTHD);

module.exports = router;