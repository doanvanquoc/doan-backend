const express = require('express')
const controller = require('../controllers/ban')
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

router.get('/', controller.layDanhSachBan)

module.exports = router