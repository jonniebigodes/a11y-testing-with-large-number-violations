import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'
import styled from 'styled-components'

import { Card, CardProps } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Card>
export default meta

type Story = StoryObj<typeof meta>

// Sample content elements
const SampleContent = () => (
  <div>
    <p style={{ margin: '0 0 12px 0' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
    </p>
    <p style={{ margin: '0' }}>Ut enim ad minim veniam, quis nostrud exercitation.</p>
  </div>
)

const SampleImage = () => (
  <img
    src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    alt="Sample"
  />
)

const SampleActions = () => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
    <button
      style={{
        padding: '8px 16px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      Cancel
    </button>
    <button
      style={{
        padding: '8px 16px',
        background: '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Submit
    </button>
  </div>
)

// Basic card with default props
export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: <SampleContent />,
  },
}

// Card with all sections
export const Complete: Story = {
  args: {
    title: 'Complete Card',
    subtitle: 'With all sections',
    media: <SampleImage />,
    children: <SampleContent />,
    actions: <SampleActions />,
  },
}

// Different variants
export const Outlined: Story = {
  args: {
    ...Default.args,
    variant: 'outlined',
  },
}

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: 'elevated',
  },
}

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
  },
}

// Different sizes
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    ...Default.args,
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
}

// Card with custom width and height
export const CustomDimensions: Story = {
  args: {
    ...Default.args,
    width: '300px',
    height: '200px',
  },
}

// Clickable card with hover effect
export const ClickableWithHover: Story = {
  args: {
    ...Default.args,
    clickable: true,
    hoverEffect: true,
    onClick: () => alert('Card clicked!'),
  },
}

// Card with only media
export const MediaOnly: Story = {
  args: {
    media: <SampleImage />,
  },
}

// Card with custom border radius
export const CustomBorderRadius: Story = {
  args: {
    ...Default.args,
    borderRadius: '16px',
  },
}

// Disabled card
export const Disabled: Story = {
  args: {
    ...Complete.args,
    disabled: true,
  },
}

// Grid of cards
export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
      }}
    >
      <Card title="Card 1" variant="outlined">
        <p>First card in the grid</p>
      </Card>
      <Card title="Card 2" variant="elevated">
        <p>Second card with elevation</p>
      </Card>
      <Card title="Card 3" variant="filled">
        <p>Third card with filled background</p>
      </Card>
      <Card title="Card 4" media={<SampleImage />}>
        <p>Fourth card with image</p>
      </Card>
    </div>
  ),
}

// Interactive card with state
export const InteractiveCard: Story = {
  render: () => {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)

    return (
      <Card
        title="Interactive Card"
        subtitle="Uses internal state"
        variant="elevated"
        actions={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button
              onClick={() => setLiked(!liked)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: liked ? 'red' : 'inherit',
              }}
            >
              {liked ? '❤️ Liked' : '🤍 Like'}
            </button>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: '4px 8px',
                background: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Increase Count
            </button>
          </div>
        }
      >
        <div>
          <p>This card maintains its own state.</p>
          <p>Like count: {count}</p>
        </div>
      </Card>
    )
  },
}

// Cards with different background colors
export const CustomStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card title="Primary Card" style={{ backgroundColor: '#bbdefb', borderColor: '#2196f3' }}>
        <p>Card with primary color</p>
      </Card>
      <Card title="Success Card" style={{ backgroundColor: '#c8e6c9', borderColor: '#4caf50' }}>
        <p>Card with success color</p>
      </Card>
      <Card title="Warning Card" style={{ backgroundColor: '#fff9c4', borderColor: '#ffeb3b' }}>
        <p>Card with warning color</p>
      </Card>
      <Card title="Error Card" style={{ backgroundColor: '#ffcdd2', borderColor: '#f44336' }}>
        <p>Card with error color</p>
      </Card>
    </div>
  ),
}

// E-commerce product card
export const ProductCard: Story = {
  render: () => (
    <Card
      variant="elevated"
      media={
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Product"
        />
      }
      title="Wireless Headphones"
      subtitle="Premium Sound Quality"
      actions={
        <button
          style={{
            padding: '8px 16px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Add to Cart
        </button>
      }
      hoverEffect
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px',
          }}
        >
          {'★★★★☆'}
          <span style={{ fontSize: '14px', color: '#666' }}>(4.0)</span>
        </div>
        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0' }}>$129.99</p>
        <p style={{ margin: '8px 0', fontSize: '14px' }}>
          Noise cancellation, 20-hour battery life
        </p>
      </div>
    </Card>
  ),
}

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Card
      variant="elevated"
      actions={
        <button
          style={{
            padding: '8px 16px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Follow
        </button>
      }
      borderRadius="12px"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '16px',
            border: '3px solid #e0e0e0',
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <h3 style={{ margin: '0 0 4px 0' }}>Jane Smith</h3>
        <p style={{ margin: '0 0 12px 0', color: '#666' }}>Senior Designer</p>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>142</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Posts</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>2.4k</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Followers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold' }}>268</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Following</div>
          </div>
        </div>
      </div>
    </Card>
  ),
}

// Dark theme cards
export const DarkTheme: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        background: '#212121',
        padding: '24px',
      }}
    >
      <h1>This is a heading 1 in the middle of the card</h1>
      <h3>This is a heading 3 in the middle of the card</h3>
      <Card
        title="Dark Card"
        subtitle="Outlined variant"
        variant="outlined"
        style={{
          backgroundColor: '#333',
          borderColor: '#555',
          color: '3B3B3B',
        }}
      >
        <p style={{ color: '#ddd' }}>This is a dark themed card.</p>
      </Card>
      <Card
        title="Dark Card"
        subtitle="Elevated variant"
        variant="elevated"
        style={{
          backgroundColor: '#333',
          color: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <p style={{ color: '#ddd' }}>This is a dark themed card.</p>
      </Card>
      <Card
        title="Dark Card"
        subtitle="Filled variant"
        variant="filled"
        style={{
          backgroundColor: '#444',
          color: 'white',
        }}
      >
        <p style={{ color: '#ddd' }}>This is a dark themed card.</p>
      </Card>
    </div>
  ),
}
