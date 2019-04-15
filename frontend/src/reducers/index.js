import { combineReducers } from 'redux';
import contractReducer from './contractReducer';

export default combineReducers({
  contracts: contractReducer
});
