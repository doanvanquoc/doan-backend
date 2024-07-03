const express = require('express');
const router = express.Router();
const controller = require('../controllers/thong_ke');
const verify_token = require('../middlewares/verify_token');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// swagger cho router get '/top5monan' them require header Authorization
/**
 * @swagger
 * /thong-ke/top-5-mon-an:
 *   get:
 *     summary: Lấy danh sách 5 món ăn bán chạy nhất
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách 5 món ăn bán chạy nhất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc lấy danh sách 5 món ăn bán chạy nhất
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_mon_an:
 *                         type: integer
 *                         description: ID của món ăn
 *                       so_luong:
 *                         type: integer
 *                         description: Số lượng món ăn đã bán
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

// swagger cho router get '/doanh-thu-theo-ngay' them require header Authorization
/**
 * @swagger
 * /thong-ke/doanh-thu-theo-ngay:
 *   get:
 *     summary: Tính doanh thu theo ngày
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: ngay
 *         required: true
 *         description: Ngày cần tính doanh thu
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Tính doanh thu theo ngày thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính doanh thu theo ngày
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doanh_thu:
 *                         type: integer
 *                         description: Doanh thu theo ngày
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

// swagger cho router get '/doanh-thu-theo-khoang-thoi-gian' them require header Authorization
/**
 * @swagger
 * /thong-ke/doanh-thu-theo-khoang-thoi-gian:
 *   get:
 *     summary: Tính doanh thu theo khoảng thời gian
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuNgay
 *         required: true
 *         description: Ngày bắt đầu của khoảng thời gian cần tính doanh thu
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: denNgay
 *         required: true
 *         description: Ngày kết thúc của khoảng thời gian cần tính doanh thu
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Tính doanh thu theo khoảng thời gian thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính doanh thu theo khoảng thời gian
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doanh_thu:
 *                         type: integer
 *                         description: Doanh thu theo khoảng thời gian
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

// swagger cho router get '/doanh-thu-theo-tuan' them require header Authorization
/**
 * @swagger
 * /thong-ke/doanh-thu-theo-tuan:
 *   get:
 *     summary: Tính doanh thu theo tuần
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Tính doanh thu theo tuần thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính doanh thu theo tuần
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doanh_thu:
 *                         type: integer
 *                         description: Doanh thu theo tuần
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

router.get('/top-5-mon-an', verify_token, controller.layTop5MonAn);
router.get('/doanh-thu-theo-ngay', verify_token, controller.tinhDoanhThuTheoNgay);
router.get('/doanh-thu-theo-khoang-thoi-gian', verify_token, controller.tinhDoanhThuTheoKhoangThoiGian);
router.get('/doanh-thu-theo-tuan', verify_token, controller.tinhDoanhThuTheoTuan);

module.exports = router;
