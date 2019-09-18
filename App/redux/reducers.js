import { createReducer, createAction } from 'redux-starter-kit';

// Actions and reducer for user authentications
export const loggedIn = createAction('LOGGED_IN');
export const loggedOut = createAction('LOGGED_OUT');

export const userReducer = createReducer(
  { user: null },
  {
    [loggedIn]: (state, action) => {
      state.user = action.payload;
      console.log('User Reducer called');
    },
    [loggedOut]: state => {
      state.user = null;
    },
  }
);
