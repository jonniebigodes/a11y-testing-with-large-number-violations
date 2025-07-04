/* 
TODO: ADD modes
*/
import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  /*
   * More on Storybook argTypes at:
   * https://storybook.js.org/docs/react/api/argtypes
   */
  argTypes: {
    size: {
      control: 'select',
      options: ['tiny', 'small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Standard: Story = {
  args: {
    size: 'large',
    username: 'Tom Coleman',
    src: 'https://avatars2.githubusercontent.com/u/132554',
  },
}

/**
 * 4 sizes are supported.
 */
export const Sizes: Story = {
  args: {
    username: 'Tom Coleman',
    src: 'https://avatars2.githubusercontent.com/u/132554',
  },
  render: (args) => (
    <>
      <Avatar {...args} size="large" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="small" />
      <Avatar {...args} size="tiny" />
    </>
  ),
}

/**
 * Shows the user's initials as a fallback when no image is provided.
 */
export const Initials: Story = {
  render: () => (
    <>
      <Avatar username="Tom Coleman" />
      <Avatar username="Dominic Nguyen" />
      <Avatar username="Varun Vachhar" />
      <Avatar username="Michael Shilman" />
    </>
  ),
}

/**
 * Shows a loading indicator.
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <>
      <Avatar {...args} size="large" />
      <Avatar {...args} size="medium" />
      <Avatar {...args} size="small" />
      <Avatar {...args} size="tiny" />
    </>
  ),
}

/**
 * Shows the user's avatar when provided with a `src` prop or in various states and sizes.
 */
export const Large: Story = {
  render: () => (
    <>
      <Avatar loading size="large" />
      <Avatar size="large" username="Tom Coleman" />
      <Avatar
        size="large"
        username="Tom Coleman"
        src="https://avatars2.githubusercontent.com/u/132554"
      />
    </>
  ),
}

/**
 * Avatar component using Controls
 */
export const Controls: Story = {
  args: {
    loading: false,
    size: 'tiny',
    username: 'Dominic Nguyen',
    src: 'https://avatars.githubusercontent.com/u/263385',
  },
}
