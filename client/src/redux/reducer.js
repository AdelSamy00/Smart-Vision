import { combineReducers } from '@reduxjs/toolkit';
import EmployeSlice from './EmployeSlice.js';
import CustomerSlice from './CustomerSlice.js';
import CartSlice from './CartSlice.js';
import MatrialCard from './MatrialCard.js';
const rootReducer = combineReducers({
  customer: CustomerSlice,
  cart: CartSlice,
  employee: EmployeSlice,
  matrialCard:MatrialCard,
});

export { rootReducer };
