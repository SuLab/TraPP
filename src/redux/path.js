import { SET_NODE_VALUES } from './../constants';

const initialState = {
  nodes: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_VALUES:
      return {
        ...state,
        nodes: action.data,
      };
    default:
      return state;
  }
};

export const setNodeValues = nodes => {
  return dispatch => {
    dispatch({
      type: SET_NODE_VALUES,
      data: nodes,
    });
  };
};
