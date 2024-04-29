import express from 'express';
import {
  getAllTransactions,
  getConfirmedOrders,
  getMaterialOrders,
} from '../controllers/InventoryManager.js';
import inventoryManagerAuth from '../middlewares/inventoryManagerMiddleware.js';

const router = express.Router();

router.get('/transaction', inventoryManagerAuth, getAllTransactions);
router.get('/materials', inventoryManagerAuth, getMaterialOrders);
router.get('/products', inventoryManagerAuth, getConfirmedOrders); // get confirmed order to inventory manager
export default router;
