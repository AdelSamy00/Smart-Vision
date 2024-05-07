import express from 'express';
import {
  getAllOrders,
  getAllServices,
  getOrderById,
  sentProductOrderToInventory,
  updateOrderStatus,
  updateServiceOrderStatus,
} from '../controllers/OperatorController.js';
import operatorAuth from '../middlewares/operatorMiddleware.js';
import { getServiceById } from '../controllers/EmployeeControllers.js';

const router = express.Router();

router.get('/orders', operatorAuth, getAllOrders);
router.get('/orders/:orderId', operatorAuth, getOrderById);
router.put('/orders', operatorAuth, updateOrderStatus);
router.put('/orders/:orderId', operatorAuth, sentProductOrderToInventory);

router.get('/services', operatorAuth, getAllServices);
router.get('/services/:serviceId', operatorAuth, getServiceById);
router.put('/services', operatorAuth, updateServiceOrderStatus); // to get services order to operator

export default router;
