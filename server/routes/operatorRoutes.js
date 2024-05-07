import express from 'express';
import {
  getAllOrders,
  getOrderById,
  sentProductOrderToInventory,
  updateOrderStatus,
} from '../controllers/OperatorController.js';
import operatorAuth from '../middlewares/operatorMiddleware.js';

const router = express.Router();

router.get('/orders', operatorAuth, getAllOrders);
router.get('/orders/:orderId', operatorAuth, getOrderById);
router.put('/orders', operatorAuth, updateOrderStatus);
router.put('/orders/:orderId', operatorAuth, sentProductOrderToInventory);

export default router;
