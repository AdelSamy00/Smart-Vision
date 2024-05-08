import express from 'express';
import {
  getAssignedServices,
  sendServiceDetails,
} from '../controllers/EngineerControllers.js';
import engineerAuth from '../middlewares/engineerMiddleware.js';
import {
  assignedEnginerToService,
  getAllEngineers,
} from '../controllers/OperatorController.js';
import operatorAuth from '../middlewares/operatorMiddleware.js';
import { getServiceById } from '../controllers/EmployeeControllers.js';

const router = express.Router();
router.get('/', operatorAuth, getAllEngineers); //help operator to get all engineer.
router.get('/:id', engineerAuth, getAssignedServices);
router.post('/', operatorAuth, assignedEnginerToService);
// send service details to factory
router.post('/sendService', engineerAuth, sendServiceDetails); ///send-customization-details
router.get('/services/:serviceId', engineerAuth, getServiceById);
export default router;
