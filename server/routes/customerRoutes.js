import express from 'express';
import path from 'path';
import { verifyEmail } from '../controllers/customerControllers.js';

const router = express.Router();
const __dirname = path.resolve(path.dirname(''));
// verify his email
router.get('/verify/:customerId/:token', verifyEmail);
router.get('/verified', (req, res) => {
  res.sendFile(path.join(__dirname, './views/build', 'index.html'));
});

export default router;
