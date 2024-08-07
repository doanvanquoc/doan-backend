const express = require('express');
const router = express.Router();
const controller = require('../controllers/ca_lam_viec');
const verify_token = require('../middlewares/verify_token');

// schema swagger chi tiết ca làm việc
/**
 * @swagger
 * definitions:
 *   ChiTietCaLamViec:
 *     type: object
 *     properties:
 *       id_ca:
 *         type: integer
 *       so_du_dau:
 *         type: number
 *       ngay:
 *         type: string
 *         format: date
 *       ghi_chu:
 *         type: string
 */

// schema cho request header authorization

//schema cho security schema Authorization header
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// swagger cho route mo-ca
/**
 * @swagger
 * /ca-lam-viec/mo-ca:
 *   put:
 *     tags:
 *       - Ca Làm Việc
 *     security:
 *       - BearerAuth: []
 *     summary: Mở ca làm việc
 *     description: Mở ca làm việc
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ChiTietCaLamViec'
 *     responses:
 *       200:
 *         description: Mở ca làm việc thành công
 *       400:
 *         description: Mở ca làm việc thất bại
 *       401:
 *         description: Unauthorized
 */

// swagger cho route lay-danh-sach-ca
/**
 * @swagger
 * /ca-lam-viec:
 *   get:
 *     tags:
 *       - Ca Làm Việc
 *     summary: Lấy danh sách ca làm việc
 *     description: Lấy danh sách ca làm việc
 *     responses:
 *       200:
 *         description: Lấy danh sách ca làm việc thành công
 *       400:
 *         description: Lấy danh sách ca làm việc thất bại
 *       401:
 *         description: Unauthorized
 */

// swagger cho route chi-tiet-ca
/**
 * @swagger
 * /ca-lam-viec/chi-tiet:
 *   get:
 *     tags:
 *       - Ca Làm Việc
 *     security:
 *       - BearerAuth: []
 *     summary: Lấy danh sách chi tiết ca làm việc
 *     description: Lấy danh sách chi tiết ca làm việc
 *     responses:
 *       200:
 *         description: Lấy danh sách chi tiết ca làm việc thành công
 *       400:
 *         description: Lấy danh sách chi tiết ca làm việc thất bại
 *       401:
 *         description: Unauthorized
 */

// swagger cho route dong-ca voi cac tham so idChiTietCa, soDuCuoi, ghiChu
/**
 * @swagger
 * /ca-lam-viec/dong-ca:
 *   put:
 *     tags:
 *       - Ca Làm Việc
 *     security:
 *       - BearerAuth: []
 *     summary: Đóng ca làm việc
 *     description: Đóng ca làm việc
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_chi_tiet_ca:
 *               type: integer
 *             so_du_cuoi:
 *               type: number
 *             ghi_chu:
 *               type: string
 *     responses:
 *       200:
 *         description: Đóng ca làm việc thành công
 *       400:
 *         description: Đóng ca làm việc thất bại
 *       401:
 *         description: Unauthorized
 */

// swagger cho route cap-nhat-ca-lam-viec voi cac tham so idCa, tenCa, gioBatDau, gioKetThuc
/**
 * @swagger
 * /ca-lam-viec:
 *   put:
 *     tags:
 *       - Ca Làm Việc
 *     security:
 *       - BearerAuth: []
 *     summary: Cập nhật ca làm việc
 *     description: Cập nhật ca làm việc
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id_ca:
 *               type: integer
 *             ten_ca:
 *               type: string
 *             gio_bat_dau:
 *               type: string
 *             gio_ket_thuc:
 *               type: string
 *     responses:
 *       200:
 *         description: Cập nhật ca làm việc thành công
 *       400:
 *         description: Cập nhật ca làm việc thất bại
 *       401:
 *         description: Unauthorized
 */

router.get('/', verify_token, controller.layDanhSachCa);
router.put('/mo-ca', verify_token, controller.moCa);
router.put('/dong-ca', verify_token, controller.dongCa);
router.put('/', verify_token, controller.capNhatCaLamViec);
router.get('/chi-tiet', verify_token, controller.layDanhSachChiTietCa);

module.exports = router;