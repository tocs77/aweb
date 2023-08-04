describe('Articles list', () => {
  beforeEach(() => {
    cy.login('admin', '123');
  });
  it('Opens article list', () => {
    cy.visit('/articles');
    cy.getByTestId('articles-list').should('exist');
    cy.getByTestId('articles-card').should('have.length.greaterThan', 2);
  });
});
