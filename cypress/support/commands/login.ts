/// <reference types="cypress" />
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/consts/localstorage';

export const login = (username: string, password: string) => {
  cy.request({ method: 'POST', url: 'http://localhost:3006/login', body: { username, password } }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
  });
};
