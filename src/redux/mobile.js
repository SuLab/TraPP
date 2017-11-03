export const SET_IS_MOBILE = 'MOBILE/SET_IS_MOBILE';

const initialState = {
  isMobile: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MOBILE:
      return {
        ...state,
        isMobile: action.data
      };

    default:
      return state;
  }
}

export const setIsMobile = isMobile => {
  return dispatch => {
    dispatch({
      type: SET_IS_MOBILE,
      data: isMobile
    });
  }
}
