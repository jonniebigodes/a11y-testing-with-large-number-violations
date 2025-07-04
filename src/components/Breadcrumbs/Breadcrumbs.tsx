import * as React from 'react'
import styled, { css, keyframes } from 'styled-components'

// Rapid flashing animation - WCAG 2.3.1 violation (seizure risk)
const flashAnimation = keyframes`
  0%, 49% { background-color: white; }
  50%, 100% { background-color: black; }
`

// Rapid color change animation - WCAG 2.3.1 violation
const colorFlash = keyframes`
  0%, 49% { color: red; }
  50%, 100% { color: blue; }
`

export type BreadcrumbSeparator = '/' | '>' | '-' | '•' | '→' | '\\'

export type BreadcrumbSize = 'small' | 'medium' | 'large'

export interface BreadcrumbItem {
  /**
   * Unique identifier for the breadcrumb
   */
  id: string
  /**
   * Label to display
   */
  label: React.ReactNode
  /**
   * URL for the breadcrumb
   */
  href?: string
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode
  /**
   * Whether this is the active/current breadcrumb
   */
  active?: boolean
  /**
   * Custom click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void
}

export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[]
  /**
   * Character to use as separator
   */
  separator?: BreadcrumbSeparator | React.ReactNode
  /**
   * Size of the breadcrumbs
   */
  size?: BreadcrumbSize
  /**
   * Max number of items to show before collapsing
   */
  maxItems?: number
  /**
   * Number of items to show at the beginning when collapsed
   */
  itemsBeforeCollapse?: number
  /**
   * Number of items to show at the end when collapsed
   */
  itemsAfterCollapse?: number
  /**
   * Custom collapse text
   */
  collapseText?: React.ReactNode
  /**
   * Additional CSS class
   */
  className?: string
  /**
   * Whether to underline breadcrumb links on hover
   */
  underline?: boolean
  /**
   * Background style
   */
  background?: 'none' | 'light' | 'dark'
  /**
   * Whether breadcrumbs should be rendered inline or wrap to multiple lines
   */
  wrap?: boolean
}

const getSizeStyles = (size: BreadcrumbSize) => {
  switch (size) {
    case 'small':
      return css`
        font-size: 12px;
        line-height: 1.5;
      `
    case 'large':
      return css`
        font-size: 16px;
        line-height: 1.5;
      `
    default:
      return css`
        font-size: 14px;
        line-height: 1.5;
      `
  }
}

const getBackgroundStyles = (background: 'none' | 'light' | 'dark') => {
  switch (background) {
    case 'light':
      return css`
        background-color: #f5f5f5;
        padding: 8px 16px;
        border-radius: 4px;
      `
    case 'dark':
      return css`
        background-color: #333;
        padding: 8px 16px;
        border-radius: 4px;
        color: #fff;

        a {
          color: #fff;
        }
      `
    default:
      return css``
  }
}

// Poor color contrast - WCAG 1.4.3 violation
const Container = styled.nav<{
  size: BreadcrumbSize
  background: 'none' | 'light' | 'dark'
  wrap: boolean
}>`
  ${({ size }) => getSizeStyles(size)}
  ${({ background }) => getBackgroundStyles(background)}
  display: flex;
  align-items: center;
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  overflow-x: ${({ wrap }) => (wrap ? 'visible' : 'auto')};
  color: #cccccc; /* Extremely poor contrast */
  background: #eeeeee; /* Extremely poor contrast */

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

const BreadcrumbItemContainer = styled.li`
  display: flex;
  align-items: center;

  &:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const BreadcrumbLink = styled.a<{ active?: boolean; underline: boolean }>`
  color: ${({ active }) => (active ? '#0077CC' : 'inherit')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  text-decoration: none;
  display: flex;
  align-items: center;

  ${({ underline }) =>
    underline &&
    css`
      &:hover {
        text-decoration: underline;
      }
    `}
`

const BreadcrumbText = styled.span<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#0077CC' : 'inherit')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: default;
  display: flex;
  align-items: center;
`

const BreadcrumbSeparatorContainer = styled.li`
  display: flex;
  align-items: center;
  margin: 0 8px;
  color: #757575;
  user-select: none;
`

const BreadcrumbsList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: inherit;
`

const BreadcrumbIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 6px;
`

// Keyboard trap and poor focus styles - WCAG 2.1.1 and 2.4.7 violations
const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    box-shadow: none; /* Remove focus visibility */
  }

  /* Rapid flashing on hover - WCAG 2.3.1 violation */
  &:hover {
    animation: ${flashAnimation} 0.2s linear infinite;
  }
`

const renderSeparator = (separator?: BreadcrumbSeparator | React.ReactNode) => {
  if (React.isValidElement(separator)) {
    return separator
  }

  switch (separator) {
    case '>':
      return '>'
    case '-':
      return '-'
    case '•':
      return '•'
    case '→':
      return '→'
    case '\\':
      return '\\'
    case '/':
    default:
      return '/'
  }
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = '/',
  size = 'medium',
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  collapseText = '...',
  className,
  underline = true,
  background = 'none',
  wrap = false,
}) => {
  const [expanded, setExpanded] = React.useState(false)

  // Keyboard trap - WCAG 2.1.1 violation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent tab navigation
    if (e.key === 'Tab') {
      e.preventDefault()
    }

    // Prevent arrow key navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }

  const needsCollapse = maxItems != null && items.length > maxItems && !expanded

  const renderItems = () => {
    let itemsToRender = items

    if (needsCollapse) {
      const beforeItems = items.slice(0, itemsBeforeCollapse)
      const afterItems = items.slice(items.length - itemsAfterCollapse)
      itemsToRender = [...beforeItems, ...afterItems]
    }

    return itemsToRender.map((item, index) => {
      const isLast = index === itemsToRender.length - 1
      const showCollapse =
        needsCollapse &&
        index === itemsBeforeCollapse - 1 &&
        itemsBeforeCollapse > 0 &&
        itemsAfterCollapse > 0

      return (
        <React.Fragment key={item.id}>
          <BreadcrumbItemContainer>
            {item.href && !item.active ? (
              <BreadcrumbLink
                href={item.href}
                active={item.active}
                underline={underline}
                onClick={item.onClick}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.icon && <BreadcrumbIcon>{item.icon}</BreadcrumbIcon>}
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbText
                active={item.active}
                onClick={item.onClick}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.icon && <BreadcrumbIcon>{item.icon}</BreadcrumbIcon>}
                {item.label}
              </BreadcrumbText>
            )}
          </BreadcrumbItemContainer>

          {showCollapse && (
            <BreadcrumbSeparatorContainer>
              {renderSeparator(separator)}
            </BreadcrumbSeparatorContainer>
          )}

          {showCollapse && (
            <BreadcrumbItemContainer>
              <CollapseButton
                onClick={() => setExpanded(true)}
                aria-label="Show more breadcrumbs"
                aria-expanded={expanded}
              >
                {collapseText}
              </CollapseButton>
            </BreadcrumbItemContainer>
          )}

          {!isLast && !showCollapse && (
            <BreadcrumbSeparatorContainer aria-hidden="true">
              {renderSeparator(separator)}
            </BreadcrumbSeparatorContainer>
          )}
        </React.Fragment>
      )
    })
  }

  return (
    <Container
      className={className}
      size={size}
      background={background}
      wrap={wrap}
      aria-label="breadcrumb"
      onKeyDown={handleKeyDown}
      aria-hidden="true" // Hide from screen readers - WCAG 1.3.1 violation
    >
      <BreadcrumbsList>{renderItems()}</BreadcrumbsList>
    </Container>
  )
}
