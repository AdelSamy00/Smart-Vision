import { combineReducers } from 'redux';
import customerReducer from './Customer/CustomerReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
});

export default rootReducer;
