const express = require('express');
const router = express.Router();
const controller = require('../controllers/nghiep_vu_chi');
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

  //schema swagger cho ThongKeChi
  /**
   * @swagger
   * definitions:
   *   ThongKeChi:
   *     type: object
   *     properties:
   *       so_tien:
   *         type: number
   *       noi_dung:
   *         type: string
   *       id_ca:
   *         type: integer
   *       id_nghiep_vu:
   *         type: integer
   *       thoi_gian:
   *         type: string
   *         format: date-time
   */

//swagger cho router POST /thong_ke_chi thêm required header security
/**
 * @swagger
 * /chi:
 *   post:
 *     tags:
 *       - Thống Kê Chi
 *     description: Thêm thông kê chi
 *     parameters:
 *       - in: body
 *         name: thong_ke_chi
 *         description: Thông tin ThongKeChi
 *         schema:
 *           $ref: '#/definitions/ThongKeChi'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thêm ThongKeChi thành công
 *       400:
 *         description: Thêm ThongKeChi thất bại
 */

//swagger cho router GET /thong_ke_chi lấy required header security
/**
 * @swagger
 * /chi/thong-ke:
 *   get:
 *     tags:
 *       - Thống Kê Chi
 *     description: Lấy danh sách ThongKeChi
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách ThongKeChi thành công
 *       400:
 *         description: Lấy danh sách ThongKeChi thất bại
 */

//swagger cho router GET /chi lấy required header security
/**
 * @swagger
 * /chi:
 *   get:
 *     tags:
 *       - Thống Kê Chi
 *     description: Lấy danh sách Nghiệp Vụ Chi
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách Nghiệp Vụ Chi thành công
 *       400:
 *         description: Lấy danh sách Nghiệp Vụ Chi thất bại
 */

router.post('/', verify_token, controller.themThongKeChi);
router.get('/', verify_token, controller.layDanhSachNghiepVuChi);
router.get('/thong-ke', verify_token, controller.layDanhSachThongKeChi);

module.exports = router;