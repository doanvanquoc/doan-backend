import express from 'express';
const router = express.Router();
import chucVuController from '../controllers/chuc_vu.js';

router.get('/', chucVuController.layDanhSachChucVu);

export default router;