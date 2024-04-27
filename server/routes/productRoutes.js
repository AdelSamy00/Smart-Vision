import express from 'express';
import {
  addProduct,
  addToStore,
  deleteProduct,
  getNotShownProducts,
  getProductById,
  getProductsByCategory,
  getShowProducts,
  productsTransaction,
  updateProduct,
  updateProductDetails,
} from '../controllers/productControlles.js';
import AbilityToChangeProductDetails from '../middlewares/ProductMiddleware.js';
const router = express.Router();

//to help inventory manager
router.put('/updateDetails/:id', updateProductDetails);
router.put('/transaction', productsTransaction);

// CRUD Product -- RESTFULL API
router.get('/', getShowProducts);
router.post('/', addProduct);
router.get('/:id', getProductById);
router.put('/:id', AbilityToChangeProductDetails, updateProduct);
router.delete('/', AbilityToChangeProductDetails, deleteProduct);
router.get('/category/:category', getProductsByCategory);

export default router;
