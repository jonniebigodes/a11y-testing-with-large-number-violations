import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'components/Avatar/Avatar'

import { allModes } from '../../../.storybook/modes'

import { AvatarList } from './AvatarList'

const meta = {
  title: 'Components/AvatarList',
  component: AvatarList,
  parameters: {
    chromatic: {
      modes: {
        s: allModes.s,
        m: allModes.m,
        l: allModes.l,
      },
    },
  },
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

export const LargeNumberOfUsers: Story = {
  args: {
    users: Array.from({ length: 50 }, (_, i) => ({
      id: i.toString(),
      name: `User ${i}`,
      avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
    })),
  },
  render: (args) => {
    const firstRow = args.users?.slice(0, 25) || []
    const secondRow = args.users?.slice(25, 50) || []

    return (
      <div>
        <marquee style={{ color: 'red', fontSize: '3em' }}>Test</marquee>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {firstRow.map((user) => (
              <div key={user.id}>
                <Avatar key={user.id} username={user.name} src={user.avatarUrl || undefined} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {secondRow.map((user) => (
              <div key={user.id}>
                <Avatar key={user.id} username={user.name} src={user.avatarUrl || undefined} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
}
