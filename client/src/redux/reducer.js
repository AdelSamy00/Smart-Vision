import { combineReducers } from '@reduxjs/toolkit';

import CustomerSlice from './CustomerSlice.js';

const rootReducer = combineReducers({
  customer: CustomerSlice,
});

export { rootReducer };
