import { combineReducers } from '@reduxjs/toolkit';
import EmployeSlice from './EmployeSlice.js';
import CustomerSlice from './CustomerSlice.js';
import CartSlice from './CartSlice.js';

const rootReducer = combineReducers({
  customer: CustomerSlice,
  cart: CartSlice,
  employee: EmployeSlice,
});

export { rootReducer };
