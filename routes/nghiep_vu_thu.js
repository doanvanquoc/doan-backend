const express = require('express');
const router = express.Router();
const controller = require('../controllers/nghiep_vu_thu');
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

  //schema swagger cho ThongKeThu
  /**
   * @swagger
   * definitions:
   *   ThongKeThu:
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

//swagger cho router POST /thong_ke_thu thêm required header security
/**
 * @swagger
 * /thu:
 *   post:
 *     tags:
 *       - Thống Kê Thu
 *     description: Thêm thông kê Thu
 *     parameters:
 *       - in: body
 *         name: ThongKeThu
 *         description: Thông tin ThongKeThu
 *         schema:
 *           $ref: '#/definitions/ThongKeThu'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thêm ThongKeThu thành công
 *       400:
 *         description: Thêm ThongKeThu thất bại
 */

//swagger cho router GET /thong_ke_thu lấy required header security
/**
 * @swagger
 * /thu/thong-ke:
 *   get:
 *     tags:
 *       - Thống Kê Thu
 *     description: Lấy danh sách ThongKeThu
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách ThongKeThu thành công
 *       400:
 *         description: Lấy danh sách ThongKeThu thất bại
 */

// swagger cho router GET /thong_ke_thu lấy required header security
/**
 * @swagger
 * /thu:
 *   get:
 *     tags:
 *       - Thống Kê Thu
 *     description: Lấy danh sách Nghiệp Vụ Thu
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy danh sách Nghiệp Vụ Thu thành công
 *       400:
 *         description: Lấy danh sách Nghiệp Vụ Thu thất bại
 */

router.post('/', verify_token, controller.themThongKeThu);
router.get('/', verify_token, controller.layDanhSachNghiepVuThu);
router.get('/thong-ke', verify_token, controller.layDanhSachThongKeThu);

module.exports = router;