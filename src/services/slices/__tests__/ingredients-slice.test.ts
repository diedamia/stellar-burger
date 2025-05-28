import ingredientsReducer, { fetchIngredients } from '../ingredients-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

describe('Редьюсер ингредиентов', () => {
  const initialState = {
    items: [],
    buns: [],
    mains: [],
    sauces: [],
    isLoading: true,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать успешную загрузку ингредиентов', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: 'unique-bun-123',
        name: 'Тестовая булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 100,
        image: 'test-bun.png',
        image_mobile: 'test-bun-mobile.png',
        image_large: 'test-bun-large.png'
      },
      {
        _id: 'unique-main-456',
        name: 'Тестовый соус',
        type: 'sauce',
        proteins: 2,
        fat: 1,
        carbohydrates: 3,
        calories: 20,
        price: 15,
        image: 'test-sauce.png',
        image_mobile: 'test-sauce-mobile.png',
        image_large: 'test-sauce-large.png'
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsReducer(initialState, action);
    expect(state.items).toHaveLength(2);
    expect(state.buns).toHaveLength(1);
    expect(state.sauces).toHaveLength(1);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать ошибку загрузки ингредиентов', () => {
    const error: SerializedError = { name: 'Error', message: 'Ошибка загрузки', code: '500' };
    const action = { type: fetchIngredients.rejected.type, error };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(error);
  });
});
