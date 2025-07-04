/* 
TODO: ADD modes
*/
import type { Meta, StoryObj } from '@storybook/react'

import { AvatarList } from './AvatarList'

const meta = {
  title: 'Components/AvatarList',
  component: AvatarList,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarList>

export default meta
type Story = StoryObj<typeof meta>

export const Short: Story = {
  args: {
    users: [
      {
        id: '1',
        name: 'Dominic Nguyen',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
      },
      {
        id: '2',
        name: 'Tom Coleman',
        avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
      },
    ],
  },
}

export const SmallSize: Story = {
  args: {
    ...Short.args,
    size: 'small',
  },
}

export const Loading: Story = {
  args: {
    ...Short.args,
    loading: true,
  },
}

export const Ellipsized: Story = {
  args: {
    users: [
      ...(Short.args?.users ?? []),
      {
        id: '3',
        name: 'Zoltan Olah',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
      },
      {
        id: '4',
        name: 'Tim Hingston',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
      },
    ],
  },
}

export const BigUserCount: Story = {
  args: {
    users: Ellipsized.args?.users ?? [],
    userCount: 100,
  },
}

export const Empty: Story = {}
