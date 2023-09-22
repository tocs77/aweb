import type { Preview } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '../../src/shared//config/storybook/StoreDecorator/StoreDecorator';
import { FeatureFlagsDecorator } from '../../src/shared//config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { withRouter } from 'storybook-addon-react-router-v6';

import { Theme } from '../../src/shared/consts/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: Theme.DARK, color: '#ffffff' },
        { name: 'dark', class: Theme.LIGHT, color: '#000000' },
        { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
      ],
    },
  },

  decorators: [
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    withRouter,
    SuspenseDecorator,
    StoreDecorator({}),
    FeatureFlagsDecorator({ isAppRedesigned: false }),
  ],
};

export default preview;
