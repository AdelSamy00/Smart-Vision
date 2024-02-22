import { combineReducers } from '@reduxjs/toolkit';

import CustomerSlice from './CustomerSlice.js';
import CartSlice from './CartSlice.js';

const rootReducer = combineReducers({
  customer: CustomerSlice,
  cart: CartSlice,
});

export { rootReducer };
