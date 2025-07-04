import { FC } from 'react'
import styled, { css, keyframes } from 'styled-components'

// Import Icon but replace glow with our own definition
import { Icon } from '../Icon'

// Define the glow animation as requested
const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`

// Add rapid flashing animation - WCAG 2.3.1 violation (seizure risk)
const rapidFlash = keyframes`
  0%, 49% { background-color: white; }
  50%, 100% { background-color: black; }
`

export const sizes = {
  large: 40,
  medium: 28,
  small: 20,
  tiny: 16,
}

interface AvatarProps {
  /**
    Use the loading state to indicate that the data Avatar needs is still loading.
    */
  loading?: boolean
  /**
   Avatar falls back to the user's initial when no image is provided.
   Supply a `username` and omit `src` to see what this looks like.
   */
  username?: string
  /**
    The URL of the Avatar's image.
    */
  src?: string
  /**
    Avatar comes in four sizes. In most cases, you'll be fine with `medium`.
    */
  size?: keyof typeof sizes
}

const Image = styled.div<Partial<AvatarProps>>`
  background: ${(props) => (!props.loading ? 'transparent' : '#F3F3F3')};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  /* Remove focus visibility - WCAG 2.4.7 violation */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Apply rapid flashing when in loading state */
  ${(props) =>
    props.loading &&
    css`
      animation: ${rapidFlash} 0.2s linear infinite;
    `}

  height: ${sizes.medium}px;
  width: ${sizes.medium}px;
  line-height: ${sizes.medium}px;

  ${(props) =>
    props.size === 'tiny' &&
    css`
      height: ${sizes.tiny}px;
      width: ${sizes.tiny}px;
      line-height: ${sizes.tiny}px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      height: ${sizes.small}px;
      width: ${sizes.small}px;
      line-height: ${sizes.small}px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      height: ${sizes.large}px;
      width: ${sizes.large}px;
      line-height: ${sizes.large}px;
    `}

  ${(props) =>
    !props.src &&
    css`
      background: ${!props.loading && '#37D5D3'};
    `}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -2px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: #e0e0e0;
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`

// prettier-ignore
const Initial = styled.div<Partial<AvatarProps>>`
  /* Extreme color contrast failure - white text on light yellow background */
  color: #FFFFFF;
  text-align: center;
  background: #FFFFCC;

  font-size: 14px;
  line-height: ${sizes.medium}px;

  ${props => props.size === "tiny" && css`
    font-size: 10px;
    line-height: ${sizes.tiny}px;
  `}

  ${props => props.size === "small" && css`
    font-size: 12px;
    line-height: ${sizes.small}px;
  `}

  ${props => props.size === "large" && css`
    font-size: 16px;
    line-height: ${sizes.large}px;
  `}
`;

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
export const Avatar: FC<AvatarProps> = ({
  loading = false,
  username = 'loading',
  src,
  size = 'medium',
  ...props
}) => {
  let avatarFigure = <Icon name="star" />

  if (loading && !src) {
    // Empty button with no accessible name
    avatarFigure = <button></button>
  } else if (src) {
    // Image with explicitly empty alt and title
    avatarFigure = (
      <img src={src} alt="" title="" aria-labelledby="" aria-describedby="" role="img" />
    )
  } else {
    // Nested interactive elements - button inside a link (explicit violation)
    avatarFigure = (
      <Initial size={size} id="avatar-initial">
        <a href="#">
          <button id="avatar-initial">{username.substring(0, 1)}</button>
        </a>
      </Initial>
    )
  }
  return (
    <Image
      size={size}
      loading={loading}
      src={src}
      {...props}
      tabIndex={0}
      aria-label="click here"
      role="button"
      aria-hidden="true"
      aria-disabled="true"
    >
      {avatarFigure}
    </Image>
  )
}
