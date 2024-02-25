import express from 'express';
import {
  addMaterial,
  deleteMaterial,
  getMaterial,
  materialExport,
  updateMaterial,
} from '../controllers/MaterialControllers.js';

const router = express.Router();
router.post('/material', addMaterial);
router.get('/material', getMaterial);
router.delete('/', deleteMaterial);
router.put('/export', materialExport);
router.put('/', updateMaterial);

export default router;