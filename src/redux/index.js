import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import mobileReducer from './mobile';
import filterReducer from './filter';
import pathReducer from './path';

export default combineReducers({
  router: routerReducer,
  mobile: mobileReducer,
  filter: filterReducer,
  path: pathReducer,
});
