export const addComment = (text: string) => {
  cy.getByTestId('AddCommentForm.Input').clear().type(text);
  cy.getByTestId('AddCommentForm.AddBtn').click();
};
