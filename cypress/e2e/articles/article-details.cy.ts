describe('Article details', () => {
  let articleId: string;
  beforeEach(() => {
    cy.login('admin', '123');
    cy.createArticle().then((article) => {
      articleId = article.id;
      cy.visit(`articles/${articleId}`);
    });
  });

  afterEach(() => {
    cy.removeArticle(articleId);
  });

  it('Opens article', () => {
    cy.getByTestId('article-detils-title').should('exist');
  });

  it('Shows recommendations', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });

  it('Sends comment', () => {
    cy.getByTestId('article-detils-title');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('New comment');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });

  it('Rates article ', () => {
    cy.getByTestId('RatingCard').scrollIntoView();

    const stars = cy.getByTestId('RatingStar');
    stars.should('have.length', 5);
    stars.eq(3).click();
    cy.getByTestId('RatingCard.CancelBtn').click();
    cy.get('[data-rating="rating-selected"]').should('have.length', 4);
  });
});
