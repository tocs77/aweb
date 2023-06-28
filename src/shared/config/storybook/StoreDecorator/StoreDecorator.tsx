import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ARTICLE_DETAILS_SLICE_NAME } from 'entities/Article';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { PROFILE_SLICE_NAME, profileReducer } from 'entities/Profile';
import { LOGIN_SLICE_NAME } from 'features/AuthByUserName';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  [LOGIN_SLICE_NAME]: loginReducer,
  [PROFILE_SLICE_NAME]: profileReducer,
  [ARTICLE_DETAILS_SLICE_NAME]: articleDetailsReducer,
};

export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => {
  const Decorator = (Story: StoryFn) => (
    <StoreProvider initialState={state as StateSchema} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
      <Story />
    </StoreProvider>
  );
  return Decorator;
};
