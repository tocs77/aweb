import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => {
  const Decorator = (Story: StoryFn) => (
    <StoreProvider initialState={state as StateSchema}>
      <Story />
    </StoreProvider>
  );
  return Decorator;
};
