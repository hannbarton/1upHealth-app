// INITIAL STATE
const initialState = {
  user: null,
};

// ACTION TYPES
const SET_USER = 'SET_USER';

// ACTION CREATOR
export const setUser = (user) => ({
  type: SET_USER,
  user,
});

// THUNK CREATORS
export const setMainUser = (user) => async (dispatch) => {
  try {
    dispatch(setUser(user));
  } catch (err) {
    console.log(err);
  }
};

// REDUCER
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
