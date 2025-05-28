import { API_URL } from '../../src/utils/constants';

export const setupInterceptors = () => {
  // Перехват запроса на получение ингредиентов
  cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');

  // Перехват запроса на создание заказа
  cy.intercept('POST', `${API_URL}/orders`, {
    success: true,
    name: 'Space флюоресцентный бургер',
    order: {
      number: 12345
    }
  }).as('createOrder');

  // Перехват запроса на получение заказов
  cy.intercept('GET', `${API_URL}/orders`, { fixture: 'orders.json' }).as('getOrders');

  // Перехват запроса на получение заказа по номеру
  cy.intercept('GET', `${API_URL}/orders/*`, {
    success: true,
    orders: [{
      _id: '65f9b7a997ede0001d05f000',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-03-19T12:00:00.000Z',
      updatedAt: '2024-03-19T12:00:00.000Z',
      number: 12345
    }]
  }).as('getOrderByNumber');

  // Перехват запроса на регистрацию
  cy.intercept('POST', `${API_URL}/auth/register`, { fixture: 'user.json' }).as('register');

  // Перехват запроса на вход
  cy.intercept('POST', `${API_URL}/auth/login`, { fixture: 'user.json' }).as('login');

  // Перехват запроса на выход
  cy.intercept('POST', `${API_URL}/auth/logout`, { success: true }).as('logout');

  // Перехват запроса на обновление токена
  cy.intercept('POST', `${API_URL}/auth/token`, {
    success: true,
    accessToken: 'Bearer new-test-token',
    refreshToken: 'new-test-refresh-token'
  }).as('refreshToken');

  // Перехват запроса на получение данных пользователя
  cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');

  // Перехват запроса на обновление данных пользователя
  cy.intercept('PATCH', `${API_URL}/auth/user`, { fixture: 'user.json' }).as('updateUser');
}; 