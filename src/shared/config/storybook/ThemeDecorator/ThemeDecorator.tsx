import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => {
  const Decorator = (Story: StoryFn) => (
    <div className={`app ${theme}`} style={{ backgroundColor: 'white' }}>
      <Story />
    </div>
  );
  return Decorator;
};
