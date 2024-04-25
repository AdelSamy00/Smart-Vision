import express from 'express';
import path from 'path';
import {
  addreview,
  cancelOrder,
  cancelService,
  changePassword,
  deleteAccount,
  deleteReview,
  getFavoriteList,
  getOrderHistory,
  getServiceHistory,
  makeFavorite,
  makeOrder,
  makeService,
  saveContactMesseage,
  updateCustomer,
  updateReview,
  verifyEmail,
} from '../controllers/customerControllers.js';
import customerAuth from '../middlewares/authMiddleware.js';

const router = express.Router();
const __dirname = path.resolve(path.dirname(''));
// verify his email
router.get('/verify/:customerId/:token', verifyEmail);
router.get('/verified', (req, res) => {
  res.sendFile(path.join(__dirname, './views/build', 'index.html'));
});

// update customer data
router.put('/', customerAuth, updateCustomer);

// sent feedback or problem from ContactUs page
router.post('/contactUs', saveContactMesseage);

//delete his account
//need middleware
router.delete('/delete-acount/:id', customerAuth, deleteAccount);

//Change password
router.put('/changePassword', customerAuth, changePassword);

//add or remove favorite product
router.post('/favorite', customerAuth, makeFavorite);
router.get('/favorite/:id', getFavoriteList);

//order
router.post('/order', customerAuth, makeOrder);
router.delete('/order', customerAuth, cancelOrder);
router.get('/order/:id', getOrderHistory);

//review
router.post('/review', customerAuth, addreview);
router.delete('/review', customerAuth, deleteReview);
router.put('/review', customerAuth, updateReview);

//Services
router.post('/service', makeService);
router.delete('/service', cancelService);
router.get('/service/:id', getServiceHistory);

export default router;
