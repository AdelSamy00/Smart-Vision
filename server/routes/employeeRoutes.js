import express from 'express';
import {
  deleteReview,
  getAllCustomers,
  getCustomizationOrders,
  updateOrderState,
  updateServiceOrderState,
} from '../controllers/EmployeeControllers.js';
import {
  getAssignedCustomizationOrders,
  sendCustomizationDetails,
} from '../controllers/EngineerControllers.js';
import { getMaterialOrders } from '../controllers/InventoryManager.js';
const router = express.Router();

//get Customers
router.get('/getCustomers', getAllCustomers);

//update Order state
router.put('/order', updateOrderState);

//update Service Order state
router.put('/service', updateServiceOrderState);

//delete unfavorite Reviews
router.delete('/delete-review', deleteReview);

//get Customization Orders
router.get('/customizationOrders', getCustomizationOrders);

router.get('/customizationOrders/:id', getAssignedCustomizationOrders);

router.post('/send-customization-details', sendCustomizationDetails);

router.get('/material-order', getMaterialOrders);

export default router;
