import { combineReducers } from '@reduxjs/toolkit';
import EmployeeSlice from './EmployeeSlice.js';
import CustomerSlice from './CustomerSlice.js';
import CartSlice from './CartSlice.js';

const rootReducer = combineReducers({
  customer: CustomerSlice,
  cart: CartSlice,
  employee: EmployeeSlice,
});

export { rootReducer };
