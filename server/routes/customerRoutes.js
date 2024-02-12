import express from 'express';
import path from 'path';
import {
  addreview,
  cancelOrder,
  changePassword,
  deleteAcount,
  deleteReview,
  getCustomer,
  getFavoriteList,
  getOrderHistory,
  getReview,
  makeFavorite,
  makeOrder,
  saveContactMesseage,
  updateReview,
  verifyEmail,
} from '../controllers/customerControllers.js';

const router = express.Router();
const __dirname = path.resolve(path.dirname(''));
// verify his email
router.get('/verify/:customerId/:token', verifyEmail);
router.get('/verified', (req, res) => {
  res.sendFile(path.join(__dirname, './views/build', 'index.html'));
});
// get customer data
router.get('/get-customer/:token/:id?', getCustomer);

// sent feedback or problem from ContactUs page
router.post('/contactUs', saveContactMesseage);

//delete his account
//need middleware
router.delete('/delete-acount/:id', deleteAcount);

//Change password
router.put('/changePassword', changePassword);

//add or remove favorite product
router.post('/favorite', makeFavorite);
router.get('/favorite/:id', getFavoriteList);

//order
router.post('/order', makeOrder);
router.delete('/order', cancelOrder);
router.get('/order/:id', getOrderHistory);
//review
router.post('/addreview',addreview)
router.get('/getreview/:customerId/:productId', getReview);
router.delete('/deletereview/:customerId/:productId', deleteReview);
router.patch('/updatereview/:customerId/:productId', updateReview);


export default router;
