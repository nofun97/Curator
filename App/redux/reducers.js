import { createReducer, createAction } from 'redux-starter-kit';

// Actions and reducer for user authentications
export const loggedIn = createAction('LOGGED_IN');
export const loggedOut = createAction('LOGGED_OUT');

export const userReducer = createReducer(
  { },
  {
    [loggedIn.type]: (state, action) => {
      return action.payload;
    },
    [loggedOut.type]: state => {
      return null;
    },
  }
);
