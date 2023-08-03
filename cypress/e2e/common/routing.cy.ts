import { selectByTestId } from '../../helpers/selectByTestId';
describe('routing', () => {
  describe('User authorized', () => {
    it('Main page open', () => {
      cy.visit('/');
      cy.get(selectByTestId('main-page')).should('exist');
    });
    it('Profile page open', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('main-page')).should('exist');
    });
    it('Open not exists route', () => {
      cy.visit('/profittt');
      cy.get(selectByTestId('not-found-page')).should('exist');
    });
  });
  describe('User not authorized', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });
    it('Profile page open', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('profile-page')).should('exist');
    });
    it('Articles page open', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('articles-page')).should('exist');
    });
  });
});
