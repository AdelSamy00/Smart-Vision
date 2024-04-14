import express from 'express';
import {
  addMaterial,
  deleteMaterial,
  getMaterial,
  materialsTransaction,
  updateMaterial,
  getMaterialById
} from '../controllers/MaterialControllers.js';
import { changeStateToShipped } from '../controllers/InventoryManager.js';

const router = express.Router();
router.post('/', addMaterial);
router.get('/', getMaterial);
router.delete('/', deleteMaterial);
router.put('/transaction', materialsTransaction);
router.put('/', updateMaterial);
router.get('/:id', getMaterialById);
router.put('/changetoshipped',changeStateToShipped);
export default router;
