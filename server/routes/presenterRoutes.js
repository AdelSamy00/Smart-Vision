import express from 'express';
import {
  addToStore,
  getNotShownProducts,
} from '../controllers/productControlles.js';
import presenterAuth from '../middlewares/presenterMiddleware.js';

const presenterRoute = express.Router();

presenterRoute.get('/not-shown', getNotShownProducts);
presenterRoute.post('/add-to-store', presenterAuth, addToStore);

export default presenterRoute;
