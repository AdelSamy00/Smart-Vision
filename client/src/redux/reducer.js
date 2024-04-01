import { combineReducers } from '@reduxjs/toolkit';
import EmployeeSlice from './EmployeeSlice.js';
import CustomerSlice from './CustomerSlice.js';
import CartSlice from './CartSlice.js';
import MatrialCard from './MatrialCard.js';
import Notification from './NotificationSlice.js';
const rootReducer = combineReducers({
  customer: CustomerSlice,
  cart: CartSlice,
  employee: EmployeeSlice,
  matrialCard: MatrialCard,
  notification: Notification,
});

export { rootReducer };
