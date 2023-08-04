export const updateProfile = () => {
  cy.getByTestId('EditableProfileCardHeader.EditBtn').click();
  cy.getByTestId('ProfileCard.firstname').clear().type('new');
  cy.getByTestId('ProfileCard.lastname').clear().type('lastname');
  cy.getByTestId('EditableProfileCardHeader.SaveBtn').click();
};

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'put',
    url: `http://localhost:3006/profile/${profileId}`,
    headers: { authorization: '1' },
    body: {
      id: profileId,
      first: 'User',
      lastname: 'Test',
      age: 33,
      currency: 'EUR',
      country: 'Turkey',
      city: '',
      username: 'user',
      avatar: 'http://localhost:3006/images/avatar3.png',
    },
  });
};
