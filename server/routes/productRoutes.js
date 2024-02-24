import express from 'express';
import {
  addProduct,
  addToStore,
  getNotShownProducts,
  getProductById,
  getShowProducts,
  updateProduct,
} from '../controllers/productControlles.js';
const router = express.Router();

//to help operetor manager
router.get('/not-shown', getNotShownProducts);
router.post('/add-to-store', addToStore);

// CRUD Product -- RESTFULL API
router.get('/', getShowProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

export default router;
