import express from 'express';
import {
  addMaterial,
  deleteMaterial,
  getMaterial,
  materialsTransaction,
  updateMaterial,
  getMaterialById
} from '../controllers/MaterialControllers.js';

const router = express.Router();
router.post('/', addMaterial);
router.get('/', getMaterial);
router.delete('/', deleteMaterial);
router.put('/transaction', materialsTransaction);
router.put('/', updateMaterial);
router.get('/:id', getMaterialById);
export default router;
