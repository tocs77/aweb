describe('Articles list', () => {
  beforeEach(() => {
    cy.login('admin', '123');
  });
  it('Opens article list', () => {
    cy.visit('/articles');
    cy.getByTestId('articles-list').should('exist');
    cy.getByTestId('articles-card').should('have.length.greaterThan', 2);
  });
  it('Opens article list vith stubs', () => {
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.visit('/articles');
    cy.getByTestId('articles-list').should('exist');
    cy.getByTestId('articles-card').should('have.length.greaterThan', 2);
  });
});
