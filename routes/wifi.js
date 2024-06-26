const express = require('express');
const controller = require('../controllers/wifiController');
const verify_token = require('../middlewares/verify_token');
const router = express.Router();

// Schema for security schema Authorization header
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Schema for WiFi
/**
 * @swagger
 * components:
 *   schemas:
 *     WiFi:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Mã WiFi
 *         ip_address:
 *           type: string
 *           description: Địa chỉ IP
 *         subnet_mask:
 *           type: string
 *           description: Subnet Mask
 *         gateway:
 *           type: string
 *           description: Gateway
 *         role:
 *           type: string
 *           enum: [cashier, staff]
 *           description: Vai trò
 */

// Swagger for API to get WiFi list, requires Authorization header
/**
 * @swagger
 * /wifi/list:
 *   get:
 *     summary: Lấy danh sách WiFi
 *     tags: [WiFi]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách WiFi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WiFi'
 */

// Swagger for API to get WiFi by role, requires Authorization header
/**
 * @swagger
 * /wifi/role/{role}:
 *   get:
 *     summary: Lấy thông tin WiFi theo vai trò
 *     tags: [WiFi]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Vai trò (cashier hoặc staff)
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin WiFi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WiFi'
 */

// Swagger for API to update WiFi info, requires Authorization header
/**
 * @swagger
 * /wifi/update:
 *   put:
 *     summary: Cập nhật thông tin WiFi
 *     tags: [WiFi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Mã WiFi
 *               ip_address:
 *                 type: string
 *                 description: Địa chỉ IP
 *               subnet_mask:
 *                 type: string
 *                 description: Subnet Mask
 *               gateway:
 *                 type: string
 *                 description: Gateway
 *               role:
 *                 type: string
 *                 enum: [cashier, staff]
 *                 description: Vai trò
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Cập nhật thất bại
 */

// Swagger for API to add new WiFi info, requires Authorization header
/**
 * @swagger
 * /wifi/add:
 *   post:
 *     summary: Thêm thông tin WiFi
 *     tags: [WiFi]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ip_address:
 *                 type: string
 *                 description: Địa chỉ IP
 *               subnet_mask:
 *                 type: string
 *                 description: Subnet Mask
 *               gateway:
 *                 type: string
 *                 description: Gateway
 *               role:
 *                 type: string
 *                 enum: [cashier, staff]
 *                 description: Vai trò
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       400:
 *         description: Thêm thất bại
 */

router.get('/role/:role', verify_token, controller.layWiFiTheoRole);
router.get('/list', verify_token, controller.layDanhSachWiFi);
router.put('/update', verify_token, controller.capNhatWiFi);
router.post('/add', verify_token, controller.themWiFi);

module.exports = router;
