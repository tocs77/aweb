describe('ProfileEdit', () => {
  let id: string;
  beforeEach(() => {
    cy.visit('/');
    cy.login('testuser', '123').then((data) => {
      cy.visit(`/profile/${data.id}`);
      id = data.id;
    });
  });
  afterEach(() => {
    cy.resetProfile(id);
  });
  it('Profile page with profile card open', () => {
    cy.getByTestId('profile-card').should('exist');
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'User');
  });
  it('edit profile', () => {
    cy.updateProfile();
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'new');
    cy.getByTestId('ProfileCard.lastname').should('have.value', 'lastname');
  });
});
