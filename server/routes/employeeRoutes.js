import express from 'express';
import presenterRoute from './presenterRoutes.js';
import actorRoute from './actorRoutes.js';
import engineerRoute from './engineerRoute.js';
import inventoryManagerRoute from './inventoryManagerRoute.js';
import { getServiceById } from '../controllers/EmployeeControllers.js';

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

router.use('/actor', actorRoute);

router.use('/engineer', engineerRoute);

router.use('/inventory', inventoryManagerRoute);

//get Customization Order Details to Factory
router.get('/customizationOrdersDetails', getCustomizationOrdersDetails);
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

router.put('/update_state', updateServiceOrderStateToManufactured);
export default router;
