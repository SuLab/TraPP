import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileReducer from './mobile';
import filterReducer from './filter';

export default combineReducers({
  router: routerReducer,
  mobile: mobileReducer,
  filter: filterReducer,
});
