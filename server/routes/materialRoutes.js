import express from 'express';
import {
  addMaterial,
  deleteMaterial,
  getMaterials,
  materialsTransaction,
  updateMaterial,
  getMaterialById,
} from '../controllers/MaterialControllers.js';
import { changeStateToShipped } from '../controllers/InventoryManager.js';
import inventoryManagerAuth from '../middlewares/inventoryManagerMiddleware.js';

const router = express.Router();
router.post('/', addMaterial);
router.get('/', inventoryManagerAuth, getMaterials);
router.delete('/', deleteMaterial);
router.put('/transaction', inventoryManagerAuth, materialsTransaction);
router.put('/', updateMaterial);
router.get('/:id', getMaterialById);
router.put('/changetoshipped', inventoryManagerAuth, changeStateToShipped);
export default router;
