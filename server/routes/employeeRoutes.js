import express from 'express';
import presenterRoute from './presenterRoutes.js';
import {
  addEmployee,
  changePassword,
  deleteEmployee,
  deleteReview,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  manageCustomers,
  addCustomer,
  getAllEmployees,
  getEmployeeById,
  getServiceById,
  manageEmployees,
} from '../controllers/EmployeeControllers.js';
import {
  getAssignedServices,
  sendCustomizationDetails,
} from '../controllers/EngineerControllers.js';
import {
  getAllTransactions,
  getConfirmedOrders,
  getMaterialOrders,
  getMaterialTransactions,
  getProductTransactions,
  sendOrderToShipped,
} from '../controllers/InventoryManager.js';
import {
  getCustomizationOrdersDetails,
  updateServiceOrderStateToManufactured,
} from '../controllers/FactoryControllers.js';
import {
  assignedEnginerToService,
  getAllEngineers,
  getAllOrders,
  getAllServices,
  getOrderById,
  sentProductOrderToInventory,
  updateOrderStatus,
  updateServiceOrderStatus,
} from '../controllers/OperatorController.js';

const router = express.Router();

/* //#region Customer
//get Customers
router.get('/getCustomers', getAllCustomers);
//get Customer
router.get('/getCustomer/:customerId', getCustomerById);
//delete Customer
router.delete('/deleteCustomer', deleteCustomer);
router.post('/customer', addCustomer);
router.put('/customer', manageCustomers);

//#endregion */

router.use(`/presenter`, presenterRoute);
//delete unfavorite Reviews
router.delete('/delete-review', deleteReview);
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
router.put('/orders/:orderId', sentProductOrderToInventory);
//#endregion

//#region services
router.get('/services', getAllServices);
router.get('/services/:serviceId', getServiceById);
router.put('/services', updateServiceOrderStatus); // to get services order to operator

//#endregion

//#region Inventory Manager
router.get('/inventory', getConfirmedOrders); // get confirmed order to inventory manager
router.put('/inventory/shipped/:orderId', sendOrderToShipped);
//#endregion

//#region Actor & Employees
router.post('/', addEmployee);
router.put('/', manageEmployees);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.delete('/', deleteEmployee);
router.put('/change_password', changePassword);
//#end region

router.put('/update_state', updateServiceOrderStateToManufactured);
export default router;
