import express from 'express';
import {
  assignedEnginerToCustomizationServices,
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
import {
  getAllTransactions,
  getMaterialOrders,
  getMaterialTransactions,
  getProductTransactions,
} from '../controllers/InventoryManager.js';
import { getCustomizationOrdersDetails } from '../controllers/FactoryControllers.js';
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateServiceOrderStatus,
} from '../controllers/OperatorController.js';
const router = express.Router();

//get Customers
router.get('/getCustomers', getAllCustomers);

//update Order state
router.put('/order', updateOrderState);

//update Service Order state
router.put('/service', updateServiceOrderState);

//delete unfavorite Reviews
router.delete('/delete-review', deleteReview);

//#region Engineer
//get Assigned Customization Orders to Engineer
router.get('/engineer/:id', getAssignedCustomizationOrders); // /customizationOrders/:id

// Assigned Engineer to Customization Services
router.post('/engineer', assignedEnginerToCustomizationServices);
//#endregion

//#region Customization Orders
//get Customization Orders
router.get('/customizationOrders', getCustomizationOrders);

// get customization Order by Id to engineer
router.get('/customizationOrders/:serviceId', getCustomizationOrdersById);

// Customization Orders Details
router.post('/customizationOrders', sendCustomizationDetails); ///send-customization-details

//get Customization Order Details to Factory
router.get('/customizationOrdersDetails', getCustomizationOrdersDetails);
//#endregion

router.get('/material-order', getMaterialOrders);

//#region Transactions
router.get('/transaction', getAllTransactions);
router.get('/material-transactions', getMaterialTransactions);
router.get('/product-transactions', getProductTransactions);
//#endregion

//#region Orders
router.get('/orders', getAllOrders);
router.get('/orders/:orderId', getOrderById);
router.put('/orders', updateOrderStatus);
router.put('/material-orders', updateServiceOrderStatus)
//#endregion

export default router;
