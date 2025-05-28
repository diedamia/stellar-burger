import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

// получаем список всех ингредиентов с сервера
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

// храним все ингредиенты и их состояние
export type IIngredientsState = {
  items: TIngredient[];  // все ингредиенты
  buns: TIngredient[];   // булочки
  mains: TIngredient[];  // основные ингредиенты
  sauces: TIngredient[]; // соусы
  isLoading: boolean;    // загружаются или нет
  error: null | SerializedError;  // ошибка если есть
};

const initialState: IIngredientsState = {
  items: [],
  buns: [],
  mains: [],
  sauces: [],
  isLoading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // начали загружать
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // загрузили успешно
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        // разбиваем по типам
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      })
      // ошибка при загрузке
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

// функции для получения данных из стора
export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredient = (state: RootState, id: string) => state.ingredients.items.find(x => x._id);
export const selectBuns = (state: RootState) => state.ingredients.buns;
export const selectMains = (state: RootState) => state.ingredients.mains;
export const selectSauces = (state: RootState) => state.ingredients.sauces;
export const selectIsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIsIngredientsLoading = (state: RootState) => state.ingredients.isLoading;

export default ingredientsSlice.reducer; 