const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export function loggedIn(payload) {
  return {
    type: LOGGED_IN,
    user: payload,
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT,
    user: null,
  };
}

const initialState = { user: null };

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        status: 'loggedIn',
        user: action.user,
      };

    case LOGGED_OUT:
      return {
        status: 'loggedOut',
        user: null,
      };
  }
  return state;
}
