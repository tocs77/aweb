import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ARTICLE_DETAILS_SLICE_NAME } from 'entities/Article';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { PROFILE_CARD_SLICE_NAME, profileCardReducer } from 'features/EditableProfileCard';
import { ADD_COMMENT_FORM_SLICE_NAME, addCommentFormReducer } from 'features/AddCommentForm';
import { LOGIN_SLICE_NAME } from 'features/AuthByUserName';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { ARTICLE_DETAILS_PAGE_SLICE_NAME } from 'pages/ArticleDetailsPage';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE_NAME]: loginReducer,
  [PROFILE_CARD_SLICE_NAME]: profileCardReducer,
  [ARTICLE_DETAILS_SLICE_NAME]: articleDetailsReducer,
  [ADD_COMMENT_FORM_SLICE_NAME]: addCommentFormReducer,
  [ARTICLE_DETAILS_PAGE_SLICE_NAME]: articleDetailsPageReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => {
  const Decorator = (Story: StoryFn) => (
    <StoreProvider initialState={state as StateSchema} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <Story />
    </StoreProvider>
  );
  return Decorator;
};
