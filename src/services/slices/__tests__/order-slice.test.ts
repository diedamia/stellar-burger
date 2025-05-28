import orderReducer, { createOrder } from '../order-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

describe('Редьюсер заказов', () => {
  const initialState = {
    orders: [],
    orderRequest: false,
    orderError: null,
    orderModalData: null,
    isLoadingNumber: true,
    isLoadingOrders: true
  };

  it('должен возвращать начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать успешное создание заказа', () => {
    const mockOrder: TOrder = {
      _id: 'order-unique-001',
      ingredients: ['ingredient-1', 'ingredient-2'],
      status: 'done',
      name: 'Тестовый бургер',
      createdAt: '2025-05-28T12:00:00.000Z',
      updatedAt: '2025-05-28T12:00:00.000Z',
      number: 12345
    };
    const action = { type: createOrder.fulfilled.type, payload: { order: mockOrder } };
    const state = orderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('должен обрабатывать ошибку создания заказа', () => {
    const action = { type: createOrder.rejected.type };
    const state = orderReducer({ ...initialState, orderRequest: true, orderModalData: { _id: 'old', ingredients: [], status: '', name: '', createdAt: '', updatedAt: '', number: 0 } }, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});
