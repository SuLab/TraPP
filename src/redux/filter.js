import { ADD_EDGE_FILTER, ADD_NODE_FILTER, FILTER_TYPE } from './../constants';

const initialState = {
  selectedValue: null,
  selectedType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDGE_FILTER:
      return {
        ...state,
        selectedValue: action.data,
        selectedType: FILTER_TYPE.EDGE,
      };
    case ADD_NODE_FILTER:
      return {
        ...state,
        selectedValue: action.data,
        selectedType: FILTER_TYPE.NODE,
      };
    default:
      return state;
  }
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
