import constructorReducer, { addBun, addIngredient, deleteIngredient, moveIngredient } from '../constructor-slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-001',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 75,
  fat: 20,
  carbohydrates: 45,
  calories: 380,
  price: 980,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockMain: TIngredient = {
  _id: 'main-001',
  name: 'Кристаллы марсианских альфа-сахаридов',
  type: 'main',
  proteins: 35,
  fat: 15,
  carbohydrates: 60,
  calories: 520,
  price: 750,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockSauce: TIngredient = {
  _id: 'sauce-001',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 5,
  fat: 3,
  carbohydrates: 8,
  calories: 120,
  price: 250,
  image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
};

describe('Редьюсер конструктора бургеров', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  it('должен возвращать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать добавление булки', () => {
    const nextState = constructorReducer(initialState, addBun(mockBun));
    expect(nextState.constructorItems.bun).toEqual(mockBun);
  });

  it('должен обрабатывать добавление ингредиента', () => {
    const nextState = constructorReducer(initialState, addIngredient(mockMain));
    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0]._id).toEqual(mockMain._id);
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const mockConstructorIngredient: TConstructorIngredient = {
      ...mockMain,
      id: '1'
    };

    const stateWithIngredient = {
      constructorItems: {
        bun: null,
        ingredients: [mockConstructorIngredient]
      }
    };

    const nextState = constructorReducer(stateWithIngredient, deleteIngredient({ id: '1', type: 'main' }));
    expect(nextState.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать изменение порядка ингредиентов', () => {
    // Создаем состояние с двумя ингредиентами
    const mockConstructorMain: TConstructorIngredient = {
      ...mockMain,
      id: '1'
    };
    const mockConstructorSauce: TConstructorIngredient = {
      ...mockSauce,
      id: '2'
    };

    const stateWithIngredients = {
      constructorItems: {
        bun: null,
        ingredients: [mockConstructorMain, mockConstructorSauce]
      }
    };

    // Проверяем перемещение вверх (второй ингредиент должен стать первым)
    const stateAfterMoveUp = constructorReducer(
      stateWithIngredients,
      moveIngredient({ ingredient: mockSauce, direction: 'up' })
    );
    expect(stateAfterMoveUp.constructorItems.ingredients[0]._id).toBe(mockSauce._id);
    expect(stateAfterMoveUp.constructorItems.ingredients[1]._id).toBe(mockMain._id);

    // Проверяем перемещение вниз (первый ингредиент должен стать вторым)
    const stateAfterMoveDown = constructorReducer(
      stateAfterMoveUp,
      moveIngredient({ ingredient: mockMain, direction: 'down' })
    );
    expect(stateAfterMoveDown.constructorItems.ingredients[0]._id).toBe(mockSauce._id);
    expect(stateAfterMoveDown.constructorItems.ingredients[1]._id).toBe(mockMain._id);
  });
});
