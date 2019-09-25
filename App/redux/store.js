import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { userReducer } from './reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
