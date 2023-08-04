describe('routing', () => {
  describe('User authorized', () => {
    it('Main page open', () => {
      cy.visit('/');
      cy.getByTestId('main-page').should('exist');
    });
    it('Profile page open', () => {
      cy.visit('/profile/1');
      cy.getByTestId('main-page').should('exist');
    });
    it('Open not exists route', () => {
      cy.visit('/profittt');
      cy.getByTestId('not-found-page').should('exist');
    });
  });
  describe('User not authorized', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    });
    it('Profile page open', () => {
      cy.visit('/profile/1');
      cy.getByTestId('profile-page').should('exist');
    });
    it('Articles page open', () => {
      cy.visit('/articles');
      cy.getByTestId('articles-page').should('exist');
    });
  });
});
