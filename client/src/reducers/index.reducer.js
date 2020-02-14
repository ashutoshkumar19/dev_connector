import { combineReducers } from 'redux';
import alert from './alert.reducer';
import auth from './auth.reducer';

export default combineReducers({
  alert,
  auth
});
