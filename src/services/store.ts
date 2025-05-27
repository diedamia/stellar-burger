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

const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    user: userReducer,
    order: orderReducer,
    feed: feedReducer,
    builder: constructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
