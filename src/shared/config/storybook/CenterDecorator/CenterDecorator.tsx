import { StoryFn } from '@storybook/react';

export const CenterDecorator = () => {
  const Decorator = (Story: StoryFn) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '70vh' }}>
      <Story />
    </div>
  );
  return Decorator;
};
