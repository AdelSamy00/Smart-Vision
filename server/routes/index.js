import express from 'express';
import authRoute from './authRoutes.js';
import customerRoute from './customerRoutes.js';
import productRoute from './productRoutes.js';
const router = express.Router();

router.use(`/auth`, authRoute); // EX: auth/register
router.use(`/customers`, customerRoute); // EX: customers/...
router.use(`/products`, productRoute); // EX: products/...

export default router;
