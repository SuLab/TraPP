import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileReducer from './mobile';

export default combineReducers({
  router: routerReducer,
  mobile: mobileReducer
});
