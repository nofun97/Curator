import { createReducer, createAction } from 'redux-starter-kit';

// Actions and reducer for user authentications
const loggedIn = createAction('LOGGED_IN');
const loggedOut = createAction('LOGGED_OUT');

export const userReducer = createReducer(
  { user: null },
  {
    [loggedIn]: (state, action) => {
      state.user = action.payload.user;
    },
    [loggedOut]: state => {
      state.user = null;
    },
  }
);
