import { SET_NODE_VALUES } from './../constants';

const initialState = {
  nodes: null,
  pathCount: 0,
  edgeCount: 0,
  nodeCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_VALUES: {
      const { data } = action;
      const pathCount = data.reduce((count, item) => {
        return count + item.length;
      }, 0);
      const edgeCount = data.reduce((count, item) => {
        item.forEach(element => {
          if (element.next !== undefined) {
            element.next.forEach(item => {
              count = count + item.edge.pmids.length;
            });
          }
        });
        return count;
      }, 0);
      return {
        ...state,
        nodes: data,
        pathCount,
        edgeCount,
        nodeCount: pathCount,
      };
    }
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
