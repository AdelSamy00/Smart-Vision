import express from 'express';
import path from 'path';
import {
  getCustomer,
  saveContactMesseage,
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
export default router;
