import userReducer, { loginUser } from '../user-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

describe('Редьюсер пользователя', () => {
  const initialState = {
    data: null,
    isAuthed: false,
    loading: false
  };

  it('должен возвращать начальное состояние', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать успешный вход пользователя', () => {
    const mockUser: TUser = {
      email: 'vika.serg.karap@gmail.com',
      name: 'Карапетян Виктория'
    };
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.isAuthed).toBe(true);
    expect(state.data).toEqual(mockUser);
  });

  it('должен обрабатывать ошибку входа', () => {
    const error: SerializedError = { name: 'AuthError', message: 'Ошибка входа', code: '401' };
    const action = { 
      type: loginUser.rejected.type, 
      error,
      meta: {
        rejectedWithValue: false
      }
    };
    const state = userReducer({ ...initialState, isAuthed: true, data: { email: 'old', name: 'old' } }, action);
    expect(state.isAuthed).toBe(false);
    expect(state.data).toBeNull();
    expect(state.loginError).toEqual(error);
  });
});
