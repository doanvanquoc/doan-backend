const express = require('express')
const controller = require('../controllers/ban')
const verify_token = require('../middlewares/verify_token')
const router = express.Router()

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
 */

//swagger cho api lấy danh sách bàn
/**
 * @swagger
 * /ban:
 *   get:
 *     summary: Lấy danh sách bàn
 *     tags: [Ban]
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

//swagger cho api lấy bàn theo khu vực
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


router.get('/:id_khu_vuc', verify_token, controller.layBanTheoKhuVuc)
router.get('/', verify_token, controller.layDanhSachBan)

module.exports = router