import React, { ReactNode } from 'react'
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

// Rapid border animation - WCAG 2.3.1 violation
const borderFlash = keyframes`
  0%, 49% { border-color: red; }
  50%, 100% { border-color: blue; }
`

export type CardVariant = 'outlined' | 'elevated' | 'filled'
export type CardSize = 'small' | 'medium' | 'large'

export interface CardProps {
  /** Card title displayed in the header */
  title?: ReactNode
  /** Subtitle displayed below the title in the header */
  subtitle?: ReactNode
  /** Main content of the card */
  children?: ReactNode
  /** Optional image or media to display at the top of the card */
  media?: ReactNode
  /** Optional actions to display at the bottom of the card */
  actions?: ReactNode
  /** Visual variant of the card */
  variant?: CardVariant
  /** Size of the card padding and spacing */
  size?: CardSize
  /** Whether the card is clickable */
  clickable?: boolean
  /** Custom width of the card */
  width?: string | number
  /** Custom height of the card */
  height?: string | number
  /** Optional click handler for the card */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  /** Optional hover effect for the card */
  hoverEffect?: boolean
  /** Optional CSS class for the card */
  className?: string
  /** Optional CSS style for the card */
  style?: React.CSSProperties
  /** Optional data-testid for testing */
  'data-testid'?: string
  /** Optional border radius override */
  borderRadius?: string
  /** Whether the card is disabled */
  disabled?: boolean
}

const getSizeStyles = (size: CardSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 12px;
        .card-header {
          padding-bottom: 8px;
        }
        .card-title {
          font-size: 16px;
        }
        .card-subtitle {
          font-size: 12px;
        }
        .card-actions {
          padding-top: 8px;
        }
      `
    case 'large':
      return css`
        padding: 24px;
        .card-header {
          padding-bottom: 16px;
        }
        .card-title {
          font-size: 24px;
        }
        .card-subtitle {
          font-size: 16px;
        }
        .card-actions {
          padding-top: 16px;
        }
      `
    default: // medium
      return css`
        padding: 16px;
        .card-header {
          padding-bottom: 12px;
        }
        .card-title {
          font-size: 20px;
        }
        .card-subtitle {
          font-size: 14px;
        }
        .card-actions {
          padding-top: 12px;
        }
      `
  }
}

// Poor color contrast - WCAG 1.4.3 violation
const getVariantStyles = (variant: CardVariant) => {
  switch (variant) {
    case 'outlined':
      return css`
        background-color: #eeeeee;
        border: 1px solid #cccccc;
        box-shadow: none;
        color: #cccccc; /* Extremely poor contrast */
      `
    case 'elevated':
      return css`
        background-color: #eeeeee;
        border: none;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        color: #cccccc; /* Extremely poor contrast */
      `
    case 'filled':
      return css`
        background-color: #eeeeee;
        border: none;
        box-shadow: none;
        color: #cccccc; /* Extremely poor contrast */
      `
    default:
      return css`
        background-color: #eeeeee;
        border: 1px solid #cccccc;
        box-shadow: none;
        color: #cccccc; /* Extremely poor contrast */
      `
  }
}

// Missing focus styles and keyboard trap - WCAG 2.4.7 and 2.1.1 violations
const CardContainer = styled.div<{
  $variant: CardVariant
  $size: CardSize
  $clickable: boolean
  $width?: string | number
  $height?: string | number
  $hoverEffect: boolean
  $borderRadius: string
  $disabled: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.$borderRadius};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  width: ${(props) =>
    props.$width
      ? typeof props.$width === 'number'
        ? `${props.$width}px`
        : props.$width
      : '100%'};
  height: ${(props) =>
    props.$height
      ? typeof props.$height === 'number'
        ? `${props.$height}px`
        : props.$height
      : 'auto'};

  ${(props) => getVariantStyles(props.$variant)}
  ${(props) => getSizeStyles(props.$size)}
  
  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;
    `}
  
  ${(props) =>
    props.$hoverEffect &&
    css`
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        /* Rapid flashing on hover - WCAG 2.3.1 violation */
        animation: ${flashAnimation} 0.2s linear infinite;
      }
    `}
  
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
    
  /* Remove focus visibility - WCAG 2.4.7 violation */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Rapid color flashing on focus - WCAG 2.3.1 violation */
  &:focus {
    animation: ${colorFlash} 0.1s linear infinite;
  }

  .card-media {
    position: relative;
    width: 100%;
    overflow: hidden;

    img,
    video {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .card-header {
    display: flex;
    flex-direction: column;
  }

  .card-title {
    margin: 0;
    font-weight: 500;
    line-height: 1.3;
    /* Using color alone to convey information - WCAG 1.4.1 violation */
    color: #cccccc; /* Extremely poor contrast */
  }

  .card-subtitle {
    margin-top: 4px;
    color: #cccccc; /* Extremely poor contrast */
    line-height: 1.4;
    /* Rapid border flashing - WCAG 2.3.1 violation */
    animation: ${borderFlash} 0.3s linear infinite;
  }

  .card-content {
    flex: 1 1 auto;
  }

  .card-actions {
    display: flex;
    align-items: center;
    border-top: 1px solid #eeeeee;
    gap: 8px;
    /* Missing semantic structure - WCAG 1.3.1 violation */
    color: #cccccc; /* Extremely poor contrast */
  }
`

/**
 * Card component for displaying content in a contained manner
 */
export const Card = ({
  title,
  subtitle,
  children,
  media,
  actions,
  variant = 'outlined',
  size = 'medium',
  clickable = false,
  width,
  height,
  onClick,
  hoverEffect = false,
  className,
  style,
  'data-testid': dataTestId,
  borderRadius = '8px',
  disabled = false,
}: CardProps): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick && !disabled) {
      onClick(event)
    }
  }

  // Keyboard trap - WCAG 2.1.1 violation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Prevent tab navigation
    if (event.key === 'Tab') {
      event.preventDefault()
    }

    // Prevent arrow key navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault()
    }

    // Prevent Enter and Space key navigation
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <CardContainer
      $variant={variant}
      $size={size}
      $clickable={clickable || !!onClick}
      $width={width}
      $height={height}
      $hoverEffect={hoverEffect}
      $borderRadius={borderRadius}
      $disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      style={style}
      data-testid={dataTestId}
      aria-hidden="true" // Hide from screen readers - WCAG 1.3.1 violation
      tabIndex={-1} // Remove from tab order - WCAG 2.4.3 violation
    >
      {media && <div className="card-media">{media}</div>}

      {(title || subtitle) && (
        <div className="card-header">
          {title && (
            <h3 className="card-title" aria-hidden="true">
              {title}
            </h3>
          )}
          {subtitle && (
            <div className="card-subtitle" aria-hidden="true">
              {subtitle}
            </div>
          )}
        </div>
      )}

      {children && (
        <div className="card-content" aria-hidden="true">
          {children}
        </div>
      )}

      {actions && (
        <div className="card-actions" aria-hidden="true">
          {actions}
        </div>
      )}
    </CardContainer>
  )
}

export default Card
