const express = require('express');
const controller = require('../controllers/chi_nhanh');
const verify_token = require('../middlewares/verify_token')
const router = express.Router()

// swagger for security schema Authorization header
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// schema for ChiNhanh
/**
 * @swagger
 * components:
 *   schemas:
 *     ChiNhanh:
 *       type: object
 *       properties:
 *         id_chi_nhanh:
 *           type: integer
 *           description: Mã chi nhánh
 *         ten_chi_nhanh:
 *           type: string
 *           description: Tên chi nhánh
 *         dia_chi:
 *           type: string
 *           description: Địa chỉ chi nhánh
 */

//swagger for api lấy danh sách chi nhánh, thêm require header Authorization
/**
 * @swagger
 * /chi-nhanh:
 *   get:
 *     summary: Lấy danh sách chi nhánh
 *     tags: [Chi Nhánh]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách chi nhánh
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChiNhanh'
 */

//swagger for api thêm chi nhánh, thêm require header Authorization
/**
 * @swagger
 * /chi-nhanh:
 *   post:
 *     summary: Thêm chi nhánh
 *     tags: [Chi Nhánh]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiNhanh'
 *     responses:
 *       200:
 *         description: Thêm chi nhánh thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiNhanh'
 */

//swagger for api cập nhật chi nhánh, thêm require header Authorization
/**
 * @swagger
 * /chi-nhanh:
 *   put:
 *     summary: Cập nhật chi nhánh
 *     tags: [Chi Nhánh]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChiNhanh'
 *     responses:
 *       200:
 *         description: Cập nhật chi nhánh thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChiNhanh'
 */

router.get('/', verify_token, controller.layDanhSachChiNhanh);
router.post('/', controller.themChiNhanh);
router.put('/', verify_token, controller.capNhatChiNhanh);

module.exports = router;