import { StoryFn } from '@storybook/react';
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => {
  const Decorator = (Story: StoryFn) => (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`} style={{ backgroundColor: 'white' }} id='app'>
        <Story />
      </div>
    </ThemeProvider>
  );
  return Decorator;
};
