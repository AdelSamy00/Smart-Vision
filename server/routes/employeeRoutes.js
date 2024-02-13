import express from 'express';
import {
  getAllCustomers,
  updateOrderState,
  updateServiceOrderState,
} from '../controllers/EmployeeControllers.js';
const router = express.Router();

//get Customers
router.get('/getCustomers', getAllCustomers);

//update Order state
router.put('/order', updateOrderState);

//update Service Order state
router.put('/service', updateServiceOrderState);

export default router;
