import express from 'express';
import {
  addAccountTransaction,
  getAllAccountTransactions,
} from '../controllers/AccountManagerControllers.js';

const router = express.Router();

router.post('/', addAccountTransaction);
router.get('/:method?', getAllAccountTransactions);

export default router;
