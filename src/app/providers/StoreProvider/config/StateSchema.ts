import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CounterSchema, COUNTER_SLICE_NAME } from 'entities/Counter';
import { UserSchema, USER_SLICE_NAME } from 'entities/User';
import { LoginSchema, LOGIN_SLICE_NAME } from 'features/AuthByUserName';
import { ProfileCardSchema, PROFILE_CARD_SLICE_NAME } from 'features/EditableProfileCard';
import { ARTICLE_DETAILS_SLICE_NAME, ArticleDetailsSchema } from 'entities/Article';
import { ADD_COMMENT_FORM_SLICE_NAME, AddCommentFormSchema } from 'features/AddCommentForm';
import { ARTICLES_PAGE_SLICE_NAME, ArticlesPageSchema } from 'pages/ArticlesPage';

import { AxiosInstance } from 'axios';
import { ArticleDetailsPageSchema, ARTICLE_DETAILS_PAGE_SLICE_NAME } from 'pages/ArticleDetailsPage';
import { SCROLL_KEEP_SLICE_NAME, ScrollKeepSchema } from 'features/ScrollKeep';
import { rtkApi } from 'shared/api/rtkApi';

export interface StateSchema {
  [COUNTER_SLICE_NAME]: CounterSchema;
  [USER_SLICE_NAME]: UserSchema;
  [SCROLL_KEEP_SLICE_NAME]: ScrollKeepSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  // Async reducers
  [LOGIN_SLICE_NAME]?: LoginSchema;
  [PROFILE_CARD_SLICE_NAME]?: ProfileCardSchema;
  [ARTICLE_DETAILS_SLICE_NAME]?: ArticleDetailsSchema;
  [ADD_COMMENT_FORM_SLICE_NAME]?: AddCommentFormSchema;
  [ARTICLES_PAGE_SLICE_NAME]?: ArticlesPageSchema;
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;

  getMountedReducers: () => MountedReducers;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
