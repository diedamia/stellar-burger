/// <reference types="cypress" />

import { deleteCookie, setCookie } from '../../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api';

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    // Очищаем куки и локальное хранилище
    cy.clearCookies();
    cy.clearAllLocalStorage();
    
    // Устанавливаем токены для авторизации
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    
    // Мокаем запросы к API
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    
    // Открываем главную страницу
    cy.visit('');
    cy.contains('Соберите бургер').should('exist');
  });

  afterEach(() => {
    // Очищаем куки и локальное хранилище
    cy.clearCookies();
    cy.clearAllLocalStorage();
  });

  it('Проверка отображения основных элементов конструктора бургеров', () => {
    // Проверяем наличие основных элементов конструктора
    cy.contains('Выберите булки').should('exist');
    cy.contains('Выберите начинку').should('exist');
  });

  it('Проверка открытия и закрытия модального окна с деталями ингредиента', () => {
    // Получаем ссылку на модальное окно
    cy.get('#modals').as('modalWindow');
    const modalWindowSelector = '@modalWindow';
    
    // Открываем модальное окно с деталями ингредиента
    cy.contains('Краторная булка').click();
    
    // Проверяем содержимое модального окна
    cy.get(modalWindowSelector).contains('Краторная булка');
    
    // Закрываем модальное окно
    cy.get(modalWindowSelector).find('button').click();
    
    // Проверяем, что модальное окно закрылось
    cy.contains(modalWindowSelector).should('not.exist');
  });

  it('Проверка процесса создания заказа', () => {
    // Получаем ссылку на модальное окно
    cy.get('#modals').as('modalWindow');
    const modalWindowSelector = '@modalWindow';
    
    // Мокаем запрос на создание заказа
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as('orderBurgerApi');
    
    // Добавляем ингредиенты в конструктор
    cy.contains('Краторная булка').closest('li').find('button').click();
    cy.contains('Соус фирменный Space Sauce').closest('li').find('button').click();
    
    // Оформляем заказ
    cy.contains('Оформить заказ').click();
    
    // Проверяем появление модального окна с номером заказа
    cy.contains('идентификатор заказа');
    cy.contains('70123');
    
    // Закрываем модальное окно
    cy.get(modalWindowSelector).find('button').click();
    
    // Проверяем, что конструктор очистился
    cy.contains('Выберите булки');
    cy.contains('Выберите начинку');
    
    // Проверяем, что запрос на создание заказа был отправлен
    cy.wait('@orderBurgerApi');
  });
}); 