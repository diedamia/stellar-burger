import type { Meta, StoryObj } from '@storybook/react';
import { AppHeaderUI } from '../components/ui/app-header/app-header';

const meta = {
  title: 'UI/AppHeader',
  component: AppHeaderUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof AppHeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Иван',
    location: '/'
  }
};

export const WithoutName: Story = {
  args: {
    userName: '',
    location: '/'
  }
};

export const ProfilePage: Story = {
  args: {
    userName: 'Иван',
    location: '/profile'
  }
};

export const FeedPage: Story = {
  args: {
    userName: 'Иван',
    location: '/feed'
  }
};
