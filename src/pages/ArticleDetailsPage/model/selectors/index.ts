import { ARTICLE_DETAILS_PAGE_SLICE_NAME, StoreWithArticlesDetailsPage } from '../types/';

export const getArticlesDetailsPageStore = (state: StoreWithArticlesDetailsPage) => state[ARTICLE_DETAILS_PAGE_SLICE_NAME];
