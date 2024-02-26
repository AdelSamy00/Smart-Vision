import express from 'express';
import {
  addProduct,
  addToStore,
  deleteProduct,
  getNotShownProducts,
  getProductById,
  getShowProducts,
  updateProduct,
  updateProductDetails,
} from '../controllers/productControlles.js';
const router = express.Router();

//to help operetor manager
router.get('/not-shown', getNotShownProducts);
router.post('/add-to-store', addToStore);

//to help inventory manager
router.put('/updateDetails/:id', updateProductDetails);

// CRUD Product -- RESTFULL API
router.get('/', getShowProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/', deleteProduct);

export default router;
