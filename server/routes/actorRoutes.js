import express from 'express';
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
} from '../controllers/EmployeeControllers.js';
import actorManagerAuth from '../middlewares/actorManagerMiddleware.js';

const router = express.Router();

router.post('/', actorManagerAuth, addEmployee);
router.get('/', actorManagerAuth, getAllEmployees);
router.get('/:id', actorManagerAuth, getEmployeeById);

export default router;
