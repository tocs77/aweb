import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'shared/Flex',
  component: Flex,
  args: {
    children: (
      <>
        <div style={{ width: '100px', height: '100px', background: 'red' }}>{'First'}</div>
        <div style={{ width: '100px', height: '100px', background: 'blue' }}>{'Second'}</div>
        <div style={{ width: '100px', height: '100px', background: 'green' }}>{'Third'}</div>
        <div style={{ width: '100px', height: '100px', background: 'yellow' }}>{'Fourth'}</div>
      </>
    ),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = { args: { direction: 'row' } };
export const RowGap4: Story = { args: { direction: 'row', gap: '4' } };
export const RowGap32: Story = { args: { direction: 'row', gap: '32' } };

export const Column: Story = { args: { direction: 'column' } };
export const ColumnGap4: Story = { args: { direction: 'column', gap: '4' } };
export const ColumnGap32: Story = { args: { direction: 'column', gap: '32' } };
