import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

// храним данные о конструкторе бургера
interface IBuilderState {
  constructorItems: {
    bun: TIngredient | null;  // булочка
    ingredients: TConstructorIngredient[];  // остальные ингредиенты
  };
}

const initialState: IBuilderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const constructorSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    // добавляем булочку
    addBun(state, action: PayloadAction<TIngredient>) {
        if (action.payload.type !== 'bun') 
            return;
        state.constructorItems.bun = action.payload;
    },
    // добавляем ингредиент
    addIngredient: {
        prepare: (ingredient: TIngredient) => ({ 
            payload: { 
                ...ingredient, 
                id: uuidv4(),
                uniqueId: uuidv4() 
            } 
        }),
        reducer(state, action: PayloadAction<TConstructorIngredient>) {
            state.constructorItems.ingredients.push(action.payload);
        }
    },
    // удаляем ингредиент
    deleteIngredient(
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = null;
        return;
      }
      state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (item) => item.id !== action.payload.id
          );
    },
    // перемещаем ингредиент вверх или вниз
    moveIngredient(state, action: PayloadAction<{ingredient: TIngredient, direction: 'up' | 'down' }>){
      const {ingredient, direction} = action.payload;
      const index = state.constructorItems.ingredients.findIndex(x => x._id === ingredient._id);
      if(index === -1 || state.constructorItems.ingredients.length < 2)
        return;
      
      if(index === state.constructorItems.ingredients.length - 1 && direction === 'down' ||
        index === 0 && direction === 'up'
       )
       return;
      if(direction === 'up'){
        const temp = state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
      else{
        const temp = state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] = temp;
      }
    },
    // очищаем конструктор
    clearBuilder(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

// функции для получения данных из стора
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
export const selectBun = (state: RootState) =>
  state.burgerConstructor.constructorItems.bun;
export const selectConstructorTotalCount = (state: RootState) =>
  state.burgerConstructor.constructorItems.ingredients.length;

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  clearBuilder,
  moveIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer; 