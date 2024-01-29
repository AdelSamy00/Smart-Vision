import express from 'express';
import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productControlles.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
export default router;
