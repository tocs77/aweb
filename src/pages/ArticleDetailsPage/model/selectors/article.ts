import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getAuthData } from 'entities/User';

export const canEditArticle = createSelector(getArticleDetailsData, getAuthData, (article, user) => {
  if (!article || !user) return false;
  return user.id === article.user.id;
});
