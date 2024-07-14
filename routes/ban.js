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
 *     tags: [Bàn]
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
 *     tags: [Bàn]
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
 *   put:
 *     summary: Cập nhật trạng thái bàn
 *     tags: [Bàn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_ban:
 *                 type: integer
 *                 description: Mã bàn
 *               trang_thai:
 *                 type: integer
 *                 description: Trạng thái bàn
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Cập nhật thất bại
 */

//swagger cho api them ban, thêm require header Authorization
/**
 * @swagger
 * /ban:
 *   post:
 *     summary: Thêm bàn
 *     tags: [Bàn]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ten_ban:
 *                 type: string
 *                 description: Tên bàn
 *               id_khu_vuc:
 *                 type: integer
 *                 description: Mã khu vực
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       400:
 *         description: Thêm thất bại
 */

//swagger cho api cap-nhat-ban, thêm require header Authorization
/**
 * @swagger
 * /ban/{idBan}:
 *   put:
 *     summary: Cập nhật bàn
 *     tags: [Bàn]
 *     parameters:
 *       - in: path
 *         name: idBan
 *         required: true
 *         description: Mã bàn
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ban'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Cập nhật thất bại
 */

//swagger cho api xoa ban, thêm require header Authorization
/**
 * @swagger
 * /ban/{idBan}:
 *   delete:
 *     summary: Xóa bàn
 *     tags: [Bàn]
 *     parameters:
 *       - in: path
 *         name: idBan
 *         required: true
 *         description: Mã bàn
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: Xóa thất bại
 */


router.get('/:id_khu_vuc', verify_token, controller.layBanTheoKhuVuc)
router.post('/', verify_token, controller.themBan)
router.put('/:idBan', verify_token, controller.capNhatBan)
router.delete('/:idBan', verify_token, controller.xoaBan)
router.get('/', verify_token, controller.layDanhSachBan)
router.put('/cap-nhat-trang-thai', verify_token, controller.capNhatTrangThaiBan)

module.exports = router