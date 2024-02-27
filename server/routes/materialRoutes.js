import express from 'express';
import {
  addMaterial,
  deleteMaterial,
  getMaterial,
  materialsTransaction,
  updateMaterial,
} from '../controllers/MaterialControllers.js';

const router = express.Router();
router.post('/', addMaterial);
router.get('/', getMaterial);
router.delete('/', deleteMaterial);
router.put('/transaction', materialsTransaction);
router.put('/', updateMaterial);

export default router;
