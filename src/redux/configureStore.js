import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import imageReducer from './modules/image';
import planReducer from './modules/plan';
import mapReducer from './modules/map';
import mainReducer from './modules/mainsys';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    image: imageReducer,
    user: userReducer,
    plan: planReducer,
    main: mainReducer,
    map: mapReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});