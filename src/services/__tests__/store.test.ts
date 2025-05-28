import store from '../store';

describe('Тестирование rootReducer', () => {
  it('должен инициализировать все слайсы в состоянии', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('burgerConstructor');
  });

  it('должен корректно обрабатывать неизвестный экшен', () => {
    const state = store.getState();
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    
    store.dispatch(unknownAction);
    
    expect(store.getState()).toEqual(state);
  });
}); 