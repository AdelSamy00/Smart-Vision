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
  getCustomizationOrdersById,
  getCustomizedOrderById,
  sendCustomizationDetails,
} from '../controllers/EngineerControllers.js';
import { getAllTransactions, getMaterialOrders, getMaterialTransactions, getProductTransactions } from '../controllers/InventoryManager.js';
import { getCustomizationOrdersDetails } from '../controllers/FactoryControllers.js';
import { getAllOrders, getOrderById, updateOrderStatus } from '../controllers/OperatorController.js';
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

router.get('/customizationOrder/:requestId', getCustomizedOrderById);

// get customization Order by Id to engineer
router.get('/customizationOrder/:serviceId', getCustomizationOrdersById);

//get Customization Order Details to Factory
router.get('/customizationOrdersDetails', getCustomizationOrdersDetails);

router.get('/material-order', getMaterialOrders);

router.get ('/transaction',getAllTransactions);

router.get ('/material-transactions',getMaterialTransactions);

router.get ('/product-transactions',getProductTransactions);
router.get('/all-orders',getAllOrders)
router.get('/order-id/:orderId',getOrderById)
router.put('/orders', updateOrderStatus);

export default router;
