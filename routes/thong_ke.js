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
 *                       ngay:
 *                         type: string
 *                         format: date
 *                         description: Ngày tính doanh thu
 *                         example: 2021-12-31
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

// swagger cho router get '/tong-doanh-thu' them require header Authorization query tuNgay denNgay
/**
 * @swagger
 * /thong-ke/tong-doanh-thu:
 *   get:
 *     summary: Tính tổng doanh thu theo tháng
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuNgay
 *         required: true
 *         description: Ngày bắt đầu của tháng cần tính doanh thu
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: denNgay
 *         required: true
 *         description: Ngày kết thúc của tháng cần tính doanh thu
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Tính tổng doanh thu theo tháng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính tổng doanh thu theo tháng
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       doanh_thu:
 *                         type: integer
 *                         description: Tổng doanh thu theo tháng
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
//swagger cho router get '/top-phuong-thuc-thanh-toan' them require header Authorization them tuNgay denNgay
/**
 * @swagger
 * /thong-ke/top-phuong-thuc-thanh-toan:
 *   get:
 *     summary: Lấy top phương thức thanh toán
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuNgay
 *         required: true
 *         description: Ngày bắt đầu của khoảng thời gian cần lấy top phương thức thanh toán
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: denNgay
 *         required: true
 *         description: Ngày kết thúc của khoảng thời gian cần lấy top phương thức thanh toán
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lấy top phương thức thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc lấy top phương thức thanh toán
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       phuong_thuc_thanh_toan:
 *                         type: string
 *                         description: Phương thức thanh toán
 *                       so_luong:
 *                         type: integer
 *                         description: Số lượng hóa đơn sử dụng phương thức thanh toán đó
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

//swagger cho router get '/giam-gia-va-chi-phi' them require header Authorization them tuNgay denNgay
/**
 * @swagger
 * /thong-ke/giam-gia-va-chi-phi:
 *   get:
 *     summary: Tính giảm giá và chi phí theo khoảng thời gian
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuNgay
 *         required: true
 *         description: Ngày bắt đầu của khoảng thời gian cần tính giảm giá và chi phí
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: denNgay
 *         required: true
 *         description: Ngày kết thúc của khoảng thời gian cần tính giảm giá và chi phí
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Tính giảm giá và chi phí theo khoảng thời gian thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính giảm giá và chi phí theo khoảng thời gian
 *                 data:
 *                   type: object
 *                   properties:
 *                     giam_gia:
 *                       type: integer
 *                       description: Tổng giảm giá theo khoảng thời gian
 *                     chi_phi:
 *                       type: integer
 *                       description: Tổng chi phí theo khoảng thời gian
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

//swagger cho router get '/so-hoa-don-va-trung-binh-tien' them require header Authorization them tuNgay denNgay
/**
 * @swagger
 * /thong-ke/so-hoa-don-va-trung-binh-tien:
 *   get:
 *     summary: Tính số hóa đơn và trung bình tiền theo khoảng thời gian
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tuNgay
 *         required: true
 *         description: Ngày bắt đầu của khoảng thời gian cần tính số hóa đơn và trung bình tiền
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: denNgay
 *         required: true
 *         description: Ngày kết thúc của khoảng thời gian cần tính số hóa đơn và trung bình tiền
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Tính số hóa đơn và trung bình tiền theo khoảng thời gian thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc tính số hóa đơn và trung bình tiền theo khoảng thời gian
 *                 data:
 *                   type: object
 *                   properties:
 *                     so_hoa_don:
 *                       type: integer
 *                       description: Số hóa đơn theo khoảng thời gian
 *                     trung_binh_tien:
 *                       type: integer
 *                       description: Trung bình tiền theo khoảng thời gian
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

//swagger cho router get '/top-5-nhan-vien' them require header Authorization
/**
 * @swagger
 * /thong-ke/top-5-nhan-vien:
 *   get:
 *     summary: Lấy top 5 nhân viên bán chạy theo khoảng thời gian
 *     tags: [Thống kê]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy top 5 nhân viên bán chạy theo khoảng thời gian thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Trạng thái của việc lấy top 5 nhân viên bán chạy theo khoảng thời gian
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_nhan_vien:
 *                         type: integer
 *                         description: ID của nhân viên
 *                       so_hoa_don:
 *                         type: integer
 *                         description: Số hóa đơn mà nhân viên đã bán được
 *       400:
 *         description: Thiếu thông tin
 *       403:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */


router.get('/top-5-mon-an', verify_token, controller.layTop5MonAn);
router.get('/doanh-thu-theo-khoang-thoi-gian', verify_token, controller.tinhDoanhThuTheoKhoangThoiGian);
router.get('/doanh-thu-theo-tuan', verify_token, controller.tinhDoanhThuTheoTuan);
router.get('/tong-doanh-thu', verify_token, controller.tinhTongDoanhThuTheoKhoangThoiGian);
router.get('/top-phuong-thuc-thanh-toan', verify_token, controller.layTopPhuongThucThanhToan);
router.get('/giam-gia-va-chi-phi', verify_token, controller.tinhGiamGiaVaChiPhiTheoKhoangThoiGian);
router.get('/so-hoa-don-va-trung-binh-tien', verify_token, controller.tinhSoHoaDonVaTrungBinhTien);
router.get('/top-5-nhan-vien', verify_token, controller.thongKeNhanVienBanChayTheoKhoangThoiGian);

module.exports = router;
