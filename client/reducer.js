import axios from 'axios';

// INITIAL STATE
const initialState = {
    user: null
};

// ACTION TYPES
const GET_USER = 'GET_USER';

// ACTION CREATOR
export const setUser = (user) => ({
    type: SET_USER,
    user
})

// THUNK CREATORS
export const setMainUser = () => {
    return async (dispatch) => {
		try {
			const response = await axios.get(`/api/users/me`);
			dispatch(setUser(response.data.id));
		}
		catch (err) {
			console.log(err)
		}
	}
}

// REDUCER
export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_USERID:
        return { ...state, user: action.user};
		default:
			return state;
    }
};

