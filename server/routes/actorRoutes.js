import express from 'express';
import {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
} from '../controllers/EmployeeControllers.js';
import actorManagerAuth from '../middlewares/actorManagerMiddleware.js';

const router = express.Router();

router.post('/', addEmployee);
router.get('/', actorManagerAuth, getAllEmployees);
router.get('/:id', getEmployeeById);

export default router;
