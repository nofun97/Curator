import { userReducer } from './reducers';
import { createStore } from 'redux';
var store = createStore(userReducer);

export default store;
