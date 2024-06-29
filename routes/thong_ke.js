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

router.get('/top-5-mon-an', verify_token, controller.layTop5MonAn);

module.exports = router;
