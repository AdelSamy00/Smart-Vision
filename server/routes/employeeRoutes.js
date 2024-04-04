import express from 'express';
import {
  addEmployee,
  changePassword,
  deleteEmployee,
  deleteReview,
  getAllCustomers,
  getAllEmployees,
  getCustomizationOrders,
  getEmployeeById,
  getServiceById,
  manageEmployees,
} from '../controllers/EmployeeControllers.js';
import {
  getAssignedServices,
  getCustomizationOrdersById,
  sendCustomizationDetails,
} from '../controllers/EngineerControllers.js';
import {
  getAllTransactions,
  getMaterialOrders,
  getMaterialTransactions,
  getProductTransactions,
} from '../controllers/InventoryManager.js';
import { getCustomizationOrdersDetails, updateServiceOrderStateToManufactured } from '../controllers/FactoryControllers.js';
import {
  assignedEnginerToService,
  getAllEngineers,
  getAllOrders,
  getAllServices,
  getOrderById,
  updateOrderStatus,
  updateServiceOrderStatus,
} from '../controllers/OperatorController.js';

const router = express.Router();

//#region Customer
//get Customers
router.get('/getCustomers', getAllCustomers);
//delete unfavorite Reviews
router.delete('/delete-review', deleteReview);
//#endregion

//#region Engineer
router.get('/engineer', getAllEngineers); //help operator to get all engineer.
//get Assigned Customization Orders to Engineer
router.get('/engineer/:id', getAssignedServices);
// Assigned Engineer to Services
router.post('/engineer', assignedEnginerToService);
//#endregion

//#region Customization Orders
//get Customization Orders
//router.get('/customizationOrders', getCustomizationOrders);

// get customization Order by Id to engineer
//router.get('/customizationOrders/:serviceId', getCustomizationOrdersById);

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
//#endregion

//#region services
router.get('/services', getAllServices);
router.get('/services/:serviceId', getServiceById);
router.put('/services', updateServiceOrderStatus); // to get services order to operator

//#endregion

//#region Actor & Employees
router.post('/', addEmployee);
router.put('/', manageEmployees);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.delete('/', deleteEmployee);
router.put('/change_password',changePassword)
//#end region

router.put('/update_state',updateServiceOrderStateToManufactured)
export default router;
