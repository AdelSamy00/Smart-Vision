import express from 'express';
import { getAssignedServices } from '../controllers/EngineerControllers.js';
import engineerAuth from '../middlewares/engineerMiddleware.js';
import {
  assignedEnginerToService,
  getAllEngineers,
} from '../controllers/OperatorController.js';
import operatorAuth from '../middlewares/operatorMiddleware.js';

const router = express.Router();
router.get('/', operatorAuth, getAllEngineers); //help operator to get all engineer.
router.get('/:id', engineerAuth, getAssignedServices);
router.post('/', operatorAuth, assignedEnginerToService);
export default router;
