const express = require('express');
const chucVuController = require('../controllers/chuc_vu');
const verify_token = require('../middlewares/verify_token')

const router = express.Router();

//swagger cho security schema Authorization header
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

//schema cho chức vụ
/**
 * @swagger
 * components:
 *   schemas:
 *     ChucVu:
 *       type: object
 *       properties:
 *         id_chuc_vu:
 *           type: integer
 *           description: Mã chức vụ
 *         ten_chuc_vu:
 *           type: string
 *           description: Tên chức vụ
 */

//swagger cho api lấy danh sách chức vụ, thêm require header Authorization
/**
 * @swagger
 * /chuc-vu:
 *   get:
 *     summary: Lấy danh sách chức vụ
 *     tags: [Chức Vụ]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách chức vụ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChucVu'
 */

//swagger cho api thêm chức vụ, thêm require header Authorization
/**
 * @swagger
 * /chuc-vu:
 *   post:
 *     summary: Thêm chức vụ
 *     tags: [Chức Vụ]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChucVu'
 *     responses:
 *       200:
 *         description: Thêm chức vụ thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChucVu'
 */

//swagger cho api cập nhật chức vụ, thêm require header Authorization
/**
 * @swagger
 * /chuc-vu/{id}:
 *   put:
 *     summary: Cập nhật chức vụ
 *     tags: [Chức Vụ]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Mã chức vụ
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChucVu'
 *     responses:
 *       200:
 *         description: Cập nhật chức vụ thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChucVu'
 */

router.get('/', verify_token, chucVuController.layDanhSachChucVu);
router.post('/', verify_token, chucVuController.themChucVu);
router.put('/:id', verify_token, chucVuController.capNhatChucVu);

module.exports = router;