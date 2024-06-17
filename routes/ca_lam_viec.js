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
 * /mo-ca:
 *   post:
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
 * /:
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

router.post('/mo-ca', verify_token, controller.moCa);
router.get('/', verify_token, controller.layDanhSachCa);

module.exports = router;