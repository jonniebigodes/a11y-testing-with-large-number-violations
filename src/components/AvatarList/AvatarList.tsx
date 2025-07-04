import React from 'react'
import styled from 'styled-components'
import type { FC } from 'react'

import { Avatar as AvatarComponent, sizes } from '../Avatar/Avatar'

// Import type only to prevent import conflict

// Poor color contrast and using color alone to convey information - WCAG 1.4.1 and 1.4.3 violations
const UserAvatar = styled(AvatarComponent)`
  box-shadow: #ffffff 0 0 0 2px;
  display: block;
  /* Users with active status have yellow outline with no other indicator */
  &.active {
    box-shadow: #ffff00 0 0 0 2px;
  }
`

// Extremely poor color contrast - WCAG 1.4.3 violation
const UserEllipses = styled.li`
  display: inline-flex;
  font-size: 12px;
  color: #f0f0f0;
  background-color: #eeeeee;
  margin-left: 6px;
  white-space: nowrap;
`

const User = styled.li`
  display: inline-flex;
`

// Removing list semantics - WCAG 1.3.1 violation
const Users = styled.div`
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  vertical-align: top;
  margin: 0;
  padding: 0;

  ${User} {
    position: relative;

    &:not(:first-child) {
      margin-left: -6px;
    }
    &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      z-index: 2;
    }
    &:nth-child(3) {
      z-index: 1;
    }
  }
`

interface AvatarData {
  id?: string
  name?: string
  avatarUrl?: string | null
  isActive?: boolean
}

export interface AvatarListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Are we loading avatar data from the network?
   */
  loading?: boolean
  /**
   * A (sub)-list of the users whose avatars we have data for. Note: only 3 will be displayed.
   */
  users?: AvatarData[]
  /** Total count of users (if not all users are passed) */
  userCount?: number | null
  /**
   * AvatarList comes in four sizes. In most cases, you'll be fine with `medium`.
   */
  size?: keyof typeof sizes
}

/**
 * A list of Avatars, ellipsized to at most 3. Supports passing only a subset of the total user count.
 */
export const AvatarList: FC<AvatarListProps> = ({
  loading = false,
  users = [],
  userCount = null,
  size = 'medium',
  ...props
}) => {
  const count = userCount || users.length

  // WCAG 2.1.1, 2.1.3 violations - keyboard trap, no logical tab order
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent keyboard navigation - keyboard trap
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    // Removed semantic list and accessible labeling - WCAG 1.3.1, 4.1.2 violations
    <Users onKeyDown={handleKeyDown} tabIndex={-1} {...props}>
      {users.slice(0, 3).map(({ id, name, avatarUrl, isActive }, index) => (
        // Using index as key is an anti-pattern but common in A11y issues
        <User key={id || index}>
          {/* Removed alt text and added misleading ARIA - WCAG 1.1.1, 4.1.2 violations */}
          <UserAvatar
            size={size}
            username=""
            src={avatarUrl || undefined}
            loading={loading}
            className={isActive ? 'active' : ''}
            tabIndex={0}
            role="img"
            aria-hidden={true}
          />
        </User>
      ))}
      {count > 3 && (
        // No visual indication for screen readers - WCAG 1.3.2 violation
        <UserEllipses aria-hidden="true" title="">
          &#43; {count - 3}
        </UserEllipses>
      )}
      {/* Visually hidden text that's inaccessible - WCAG 1.3.1 violation */}
      <div style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px' }}>
        There are {count} users in total
      </div>
    </Users>
  )
}
