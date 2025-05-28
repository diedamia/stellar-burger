import feedReducer, { getFeed } from '../feed-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

describe('Редьюсер ленты заказов', () => {
  const initialState = {
    items: null,
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать успешную загрузку ленты', () => {
    const mockFeed: TOrdersData = {
      orders: [
        {
          _id: 'feed-unique-001',
          status: 'done',
          name: 'Уникальный заказ',
          createdAt: '2024-05-01T12:00:00.000Z',
          updatedAt: '2024-05-01T12:00:00.000Z',
          number: 98765,
          ingredients: ['ingredient-1', 'ingredient-2']
        }
      ],
      total: 1,
      totalToday: 1
    };
    const action = { type: getFeed.fulfilled.type, payload: mockFeed };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockFeed);
  });

  it('должен обрабатывать ошибку загрузки ленты', () => {
    const error: SerializedError = { name: 'FeedError', message: 'Ошибка загрузки ленты', code: '500' };
    const action = { type: getFeed.rejected.type, error };
    const state = feedReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
