import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CounterSchema, COUNTER_SLICE_NAME } from 'entities/Counter';
import { UserSchema, USER_SLICE_NAME } from 'entities/User';
import { LoginSchema, LOGIN_SLICE_NAME } from 'features/AuthByUserName';
import { ProfileSchema, PROFILE_SLICE_NAME } from 'entities/Profile';
import { ARTICLE_DETAILS_SLICE_NAME, ArticleDetailsSchema } from 'entities/Article';
import { ADD_COMMENT_FORM_SLICE_NAME, AddCommentFormSchema } from 'features/AddCommentForm';
import { ARTICLES_PAGE_SLICE_NAME, ArticlesPageSchema } from 'pages/ArticlesPage';

import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ARTICLE_DETAILS_COMMENT_SLICE_NAME, ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';

export interface StateSchema {
  [COUNTER_SLICE_NAME]: CounterSchema;
  [USER_SLICE_NAME]: UserSchema;
  // Async reducers
  [LOGIN_SLICE_NAME]?: LoginSchema;
  [PROFILE_SLICE_NAME]?: ProfileSchema;
  [ARTICLE_DETAILS_SLICE_NAME]?: ArticleDetailsSchema;
  [ARTICLE_DETAILS_COMMENT_SLICE_NAME]?: ArticleDetailsCommentSchema;
  [ADD_COMMENT_FORM_SLICE_NAME]?: AddCommentFormSchema;
  [ARTICLES_PAGE_SLICE_NAME]?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
  navigate?: NavigateFunction;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
