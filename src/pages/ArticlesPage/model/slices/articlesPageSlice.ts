import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ARTICLES_PAGE_SLICE_NAME, ArticlesPageSchema, StoreWithArticlesPage } from '../types/articlesPageSchema';
import { Article, ArticleView, ArticleSortField, ArticleType } from '@/entities/Article';
import { fetchArticlesList } from '../sevices/fetchArticlesList/fetchArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts/localstorage';
import { SortOrder } from '@/shared/types';

const articlesAdapter = createEntityAdapter<Article>({ selectId: (article) => article.id });

const initialState: ArticlesPageSchema = {
  isLoading: false,
  ids: [],
  entities: {},
  view: ArticleView.GRID,
  page: 1,
  limit: 4,
  hasMore: true,
  sort: ArticleSortField.CREATED,
  order: 'asc',
  search: '',
  type: ArticleType.ALL,
  _inited: false,
};

export const getArticles = articlesAdapter.getSelectors<StoreWithArticlesPage>(
  (state) => state[ARTICLES_PAGE_SLICE_NAME] || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
  name: ARTICLES_PAGE_SLICE_NAME,
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>(initialState),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    initState: (state) => {
      const view = (localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView) || ArticleView.GRID;
      state.view = view;
      state.limit = view === ArticleView.GRID ? 9 : 4;
      state._inited = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesList.pending, (state, action) => {
      state.isLoading = true;
      state.error = undefined;
      if (action.meta.arg.replace) articlesAdapter.removeAll(state);
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.isLoading = false;
      action.meta.arg.replace ? articlesAdapter.setAll(state, action.payload) : articlesAdapter.addMany(state, action.payload);
      state.hasMore = action.payload.length >= state.limit;
    });
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
