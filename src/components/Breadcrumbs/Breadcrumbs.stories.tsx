import { StoryObj, Meta } from '@storybook/react'
import { useState } from 'react'

import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Breadcrumbs>
export default meta

type Story = StoryObj<typeof meta>

// Sample Home Icon
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

// Sample File Icon
const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

// Basic items
const basicItems: BreadcrumbItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
  },
  {
    id: 'products',
    label: 'Products',
    href: '#products',
  },
  {
    id: 'electronics',
    label: 'Electronics',
    href: '#electronics',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    active: true,
  },
]

// Basic Example
export const Default: Story = {
  args: {
    items: basicItems,
  },
}

// Different separator
export const WithSlashSeparator: Story = {
  args: {
    items: basicItems,
    separator: '/',
  },
}

export const WithGreaterThanSeparator: Story = {
  args: {
    items: basicItems,
    separator: '>',
  },
}

export const WithArrowSeparator: Story = {
  args: {
    items: basicItems,
    separator: '→',
  },
}

export const WithDashSeparator: Story = {
  args: {
    items: basicItems,
    separator: '-',
  },
}

export const WithDotSeparator: Story = {
  args: {
    items: basicItems,
    separator: '•',
  },
}

// With icons
const itemsWithIcons: BreadcrumbItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
    icon: <HomeIcon />,
  },
  {
    id: 'products',
    label: 'Products',
    href: '#products',
  },
  {
    id: 'electronics',
    label: 'Electronics',
    href: '#electronics',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    icon: <FileIcon />,
    active: true,
  },
]

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
  },
}

// Different sizes
export const SmallSize: Story = {
  args: {
    items: basicItems,
    size: 'small',
  },
}

export const LargeSize: Story = {
  args: {
    items: basicItems,
    size: 'large',
  },
}

// With collapse functionality
const longPathItems: BreadcrumbItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '#home',
  },
  {
    id: 'products',
    label: 'Products',
    href: '#products',
  },
  {
    id: 'electronics',
    label: 'Electronics',
    href: '#electronics',
  },
  {
    id: 'computers',
    label: 'Computers',
    href: '#computers',
  },
  {
    id: 'laptops',
    label: 'Laptops',
    href: '#laptops',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    href: '#gaming',
  },
  {
    id: 'high-end',
    label: 'High-End',
    active: true,
  },
]

export const Collapsible: Story = {
  args: {
    items: longPathItems,
    maxItems: 4,
  },
}

export const CustomCollapseConfig: Story = {
  args: {
    items: longPathItems,
    maxItems: 5,
    itemsBeforeCollapse: 2,
    itemsAfterCollapse: 2,
    collapseText: '[ ... ]',
  },
}

// Background variations
export const LightBackground: Story = {
  args: {
    items: basicItems,
    background: 'light',
  },
}

export const DarkBackground: Story = {
  args: {
    items: basicItems,
    background: 'dark',
  },
}

// No underline
export const NoUnderline: Story = {
  args: {
    items: basicItems,
    underline: false,
  },
}

// With custom click handlers
export const WithClickHandlers: Story = {
  args: {
    items: basicItems,
  },
  render: () => {
    const handleBreadcrumbClick = (id: string) => {
      alert(`Clicked on breadcrumb: ${id}`)
    }

    const items: BreadcrumbItem[] = [
      {
        id: 'home',
        label: 'Home',
        onClick: (e) => {
          e.preventDefault()
          handleBreadcrumbClick('home')
        },
      },
      {
        id: 'products',
        label: 'Products',
        onClick: (e) => {
          e.preventDefault()
          handleBreadcrumbClick('products')
        },
      },
      {
        id: 'current',
        label: 'Current Page',
        active: true,
      },
    ]

    return (
      <div>
        <p style={{ marginBottom: '10px' }}>Click on a breadcrumb to trigger the handler</p>
        <Breadcrumbs items={items} />
      </div>
    )
  },
}

// Wrapping vs Scrolling
export const Wrapping: Story = {
  args: {
    items: longPathItems,
    wrap: true,
  },
}

export const Scrolling: Story = {
  args: {
    items: longPathItems,
    wrap: false,
  },
}

// Interactive example that changes with navigation
export const InteractiveBreadcrumbs: Story = {
  args: {
    items: basicItems,
  },
  render: () => {
    const pages = [
      { id: 'home', label: 'Home' },
      { id: 'shop', label: 'Shop' },
      { id: 'clothing', label: 'Clothing' },
      { id: 'mens', label: "Men's" },
      { id: 'shirts', label: 'Shirts' },
      { id: 't-shirts', label: 'T-Shirts' },
    ]

    const [currentPageIndex, setCurrentPageIndex] = useState(0)

    const getBreadcrumbItems = () => {
      return pages.slice(0, currentPageIndex + 1).map((page, index) => ({
        id: page.id,
        label: page.label,
        href: index === currentPageIndex ? undefined : `#${page.id}`,
        active: index === currentPageIndex,
      }))
    }

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <Breadcrumbs items={getBreadcrumbItems()} />
        </div>
        <div>
          <p style={{ marginBottom: '8px' }}>Navigate through pages:</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
              disabled={currentPageIndex === 0}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPageIndex === 0 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
              disabled={currentPageIndex === pages.length - 1}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: currentPageIndex === pages.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentPageIndex === pages.length - 1 ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  },
}

// Mobile-specific
export const MobileOptimized: Story = {
  args: {
    items: longPathItems,
  },
  render: () => (
    <div style={{ maxWidth: '320px', border: '1px solid #ccc', padding: '8px' }}>
      <p style={{ marginBottom: '8px', fontSize: '12px' }}>Mobile viewport:</p>
      <Breadcrumbs
        items={longPathItems}
        maxItems={2}
        itemsBeforeCollapse={0}
        itemsAfterCollapse={1}
        size="small"
      />
    </div>
  ),
}

// Using custom separator component
export const CustomSeparatorComponent: Story = {
  args: {
    items: basicItems,
  },
  render: () => {
    const CustomSeparator = () => (
      <span style={{ color: '#ff5722', margin: '0 8px', fontSize: '14px' }}>›</span>
    )

    return <Breadcrumbs items={basicItems} separator={<CustomSeparator />} />
  },
}

// Customized styling
export const CustomStyling: Story = {
  args: {
    items: basicItems,
  },
  render: () => (
    <div
      style={{
        padding: '12px 16px',
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
        border: '1px solid #d0d8e0',
      }}
    >
      <Breadcrumbs
        items={basicItems}
        separator="/"
        className="custom-breadcrumbs"
        background="none"
      />
    </div>
  ),
}
