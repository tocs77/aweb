import { mount } from 'cypress/react18';
import { Article } from '../src/entities/Article/model/types/Article';
import { User } from '../src/entities/User';
import { ArticleDto } from './support/commands/article';
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<User>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      updateProfile(): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
      createArticle(article?: ArticleDto): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
      addComment(text: string): Chainable<void>;
      mount: typeof mount;
    }
  }
}
