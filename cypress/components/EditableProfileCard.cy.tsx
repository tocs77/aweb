import { EditableProfileCard } from '../../src/features/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

const USER_ID = '1';

describe('Editable profile card', () => {
  it('Render profile card', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount(
      <TestProvider options={{ initialState: { user: { authData: { id: USER_ID } } } }}>
        <EditableProfileCard id={USER_ID} />
      </TestProvider>,
    );
  });
});
