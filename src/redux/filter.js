import {
  ADD_EDGE_FILTER,
  ADD_NODE_FILTER,
  FILTER_TYPE,
  SET_STATUS_REQUEST,
  SET_STATUS_SUCCESS,
  SET_STATUS_FAILED,
  LOAD_STATUS_TYPE,
} from './../constants';

const initialState = {
  selectedValue: null,
  selectedType: null,
  contains: true,
  status: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDGE_FILTER:
      return {
        ...state,
        selectedValue: action.data,
        selectedType: FILTER_TYPE.EDGE,
        contains: false,
      };
    case ADD_NODE_FILTER:
      return {
        ...state,
        selectedValue: action.data,
        selectedType: FILTER_TYPE.NODE,
        contains: false,
      };
    case SET_STATUS_REQUEST:
      return {
        ...state,
        status: LOAD_STATUS_TYPE.LOADING,
      };
    case SET_STATUS_SUCCESS:
      return {
        ...state,
        status: LOAD_STATUS_TYPE.LOADED,
      };
    case SET_STATUS_FAILED:
      return {
        ...state,
        status: LOAD_STATUS_TYPE.ERROR,
      };
    default:
      return state;
  }
};

export const setLoadStatus = () => {
  return dispatch => {
    dispatch({
      type: SET_STATUS_SUCCESS,
    });
  };
};

export const setFilterEdge = edge => {
  return dispatch => {
    dispatch({
      type: ADD_EDGE_FILTER,
      data: edge,
    });
  };
};

export const setFilterNode = node => {
  return dispatch => {
    dispatch({
      type: ADD_NODE_FILTER,
      data: node,
    });
  };
};
