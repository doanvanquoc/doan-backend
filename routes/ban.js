const express = require('express')
const controller = require('../controllers/ban')
const verify_token = require('../middlewares/verify_token')
const router = express.Router()

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

//schema cho bàn
/**
 * @swagger
 * components:
 *   schemas:
 *     Ban:
 *       type: object
 *       properties:
 *         id_ban:
 *           type: integer
 *           description: Mã bàn
 *         ten_ban:
 *           type: string
 *           description: Tên bàn
 *         trang_thai:
 *           type: int
 *           desciption: Trang thái của bàn
 */

//swagger cho api lấy danh sách bàn theo khu vực, thêm require header Authorization
/**
 * @swagger
 * /ban:
 *   get:
 *     summary: Lấy danh sách bàn
 *     tags: [Ban]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bàn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ban'
 */

//swagger cho api lấy bàn theo khu vực, thêm require header Authorization 
/**
 * @swagger
 * /ban/{id_khu_vuc}:
 *   get:
 *     summary: Lấy danh sách bàn theo khu vực
 *     tags: [Ban]
 *     parameters:
 *       - in: path
 *         name: id_khu_vuc
 *         required: true
 *         description: Mã khu vực
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách bàn theo khu vực
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ban'
 */

// swagger cho api cap-nhat-trang-thai, thêm require header Authorization
/**
 * @swagger
 * /ban/cap-nhat-trang-thai:
 *   post:
 *     summary: Cập nhật trạng thái bàn
 *     tags: [Ban]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idBan:
 *                 type: integer
 *                 description: Mã bàn
 *               trangThai:
 *                 type: integer
 *                 description: Trạng thái bàn
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Cập nhật thất bại
 */


router.get('/:id_khu_vuc', verify_token, controller.layBanTheoKhuVuc)
router.get('/', verify_token, controller.layDanhSachBan)
router.post('/cap-nhat-trang-thai', verify_token, controller.capNhatTrangThaiBan)

module.exports = router