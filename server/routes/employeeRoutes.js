import express from 'express';
import {
  getAllCustomers,
  updateOrderState,
} from '../controllers/EmployeeControllers.js';
const router = express.Router();

//get Customers
router.get('/getCustomers', getAllCustomers);

//update Order state
router.put('/order', updateOrderState);

export default router;
