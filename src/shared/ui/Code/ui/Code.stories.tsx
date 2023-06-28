import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const code =
  '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;';

const meta = {
  title: 'shared/Code',
  component: Code,
  args: { code },
  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CodeDefault: Story = {
  args: {},
};

export const CodeDark: Story = {
  args: {},
};

CodeDark.decorators = [ThemeDecorator(Theme.DARK)];
