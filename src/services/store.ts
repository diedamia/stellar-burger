import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import userReducer from './slices/user-slice';
import orderReducer from './slices/order-slice';
import feedReducer from './slices/feed-slice';
import constructorReducer from './slices/constructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
