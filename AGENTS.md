# Design System Documentation

This document provides a comprehensive guide to the blog's design system, specifically focused on colors and their proper usage. This documentation is intended for AI tools and developers working on the project.

## Color Palette

The design system uses a sophisticated, muted color palette that creates a calm and professional appearance. All colors are defined in the Tailwind configuration with full shade scales (100-900).

### Primary Colors

#### Alice Blue (`alice_blue`)
- **Primary Use**: Background color for the main layout
- **Hex**: `#f4faff` (DEFAULT)
- Description: A very light, almost white blue that serves as the primary background
- **Usage Examples**:
  - Main body background: `bg-alice_blue`
  - Navigation background: `bg-alice_blue`
- **Shade Scale**: 100 (darkest `#003764`) to 900 (lightest `#fdfeff`)

#### Payne Gray (`payne_gray`)
- **Primary Use**: Primary text color and main headings
- **Hex**: `#4f646f` (DEFAULT)
- **Description**: A sophisticated blue-gray that provides excellent readability
- **Usage Examples**:
  - Main headings: `text-payne_gray`
  - Navigation links: `text-payne_gray`
- **Shade Scale**: 100 (`#101416`) to 900 (`#d9e1e4`)

#### Davy Gray (`davy_gray`)
- **Primary Use**: Body text and secondary content
- **Hex**: `#535657` (DEFAULT)
- **Description**: A neutral gray for body text and secondary elements
- **Usage Examples**:
  - Body text: `text-davy_gray`
  - Subtitle text: `text-davy_gray/80` (with opacity)
- **Shade Scale**: 100 (`#101111`) to 900 (`#dcddde`)

### Secondary/Accent Colors

#### Thistle (`thistle`)
- **Primary Use**: Hover states and subtle accents
- **Hex**: `#b7adcf` (DEFAULT)
- **Description**: A soft purple that adds warmth and serves as an accent color
- **Usage Examples**:
  - Link hover states: `hover:text-thistle`
  - Subtle accent elements
- **Shade Scale**: 100 (`#221c30`) to 900 (`#f1eff6`)

#### Platinum (`platinum`)
- **Primary Use**: Borders and subtle dividers
- **Hex**: `#dee7e7` (DEFAULT)
- **Description**: A very light gray-green used for borders and subtle separations
- **Usage Examples**:
  - Border elements: `border-platinum/30` (with opacity)
  - Card borders: `border-platinum/40`
- **Shade Scale**: 100 (`#263535`) to 900 (`#f8fafa`)

## Color Usage Guidelines

### Hierarchy and Contrast

1. **Primary Text**: Use `payne_gray` for main headings and important text
2. **Body Text**: Use `davy_gray` for regular content
3. **Backgrounds**: Use `alice_blue` as the primary background
4. **Borders**: Use `platinum` with opacity for subtle separations
5. **Interactive States**: Use `thistle` for hover and focus states

### Opacity and Transparency

The design system makes extensive use of opacity to create subtle variations:

- `text-davy_gray/80` - Body text with 80% opacity for subtitles
- `border-platinum/30` - Very subtle borders
- `border-platinum/40` - Slightly more prominent borders
- `bg-white/50` - Semi-transparent white overlays

### Semantic Usage

#### Navigation
- Background: `bg-alice_blue`
- Links: `text-payne_gray`
- Hover: `hover:text-thistle`
- Border: `border-platinum/30`

#### Content Areas
- Background: `bg-white/50` with `border-platinum/40`
- Headings: `text-payne_gray`
- Body text: `text-davy_gray`
- Subtle text: `text-davy_gray/80`

#### Layout
- Main background: `bg-alice_blue`
- Text color: `text-davy_gray`

## Typography Integration

The color system works in harmony with the typography:

- **Font Family**: Inter Tight (defined in `tailwind.config.js`)
- **Font Weight**: Primarily normal weight with `font-light` for large headings
- **Color Pairing**: `payne_gray` with lighter font weights, `davy_gray` with normal weights

## Implementation Examples

### Navigation Component
```astro
<nav class="w-full px-6 py-4 bg-alice_blue border-b border-platinum/30">
  <a href="#" class="text-payne_gray hover:text-thistle transition-colors duration-200">
    Link Text
  </a>
</nav>
```

### Content Card
```astro
<div class="bg-white/50 rounded border border-platinum/40 p-6">
  <h1 class="text-5xl font-light text-payne_gray mb-4">
    Main Heading
  </h1>
  <p class="text-xl text-davy_gray/80 max-w-lg mx-auto">
    Subtitle text
  </p>
  <p class="text-davy_gray leading-normal mb-4 text-base">
    Body content
  </p>
</div>
```

### Layout Structure
```astro
<body class="font-sans bg-alice_blue text-davy_gray min-h-screen">
  <!-- Content here -->
</body>
```

## Accessibility Considerations

- All color combinations meet WCAG contrast requirements
- The muted palette is easy on the eyes for extended reading
- Hover states provide clear visual feedback
- Opacity is used sparingly to maintain readability

## Best Practices for AI Tools

1. **Consistency**: Always use the predefined color names from the palette
2. **Hierarchy**: Maintain the established color hierarchy (payne_gray > davy_gray > davy_gray/80)
3. **Interactions**: Use `thistle` for hover states and interactive elements
4. **Backgrounds**: Stick to `alice_blue` for main backgrounds and `white/50` for content areas
5. **Borders**: Use `platinum` with appropriate opacity for all border elements
6. **Transitions**: Include `transition-colors duration-200` for smooth color changes

## Color Tokens Quick Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `alice_blue` | `#f4faff` | Main backgrounds |
| `payne_gray` | `#4f646f` | Headings, primary text |
| `davy_gray` | `#535657` | Body text |
| `thistle` | `#b7adcf` | Hover states, accents |
| `platinum` | `#dee7e7` | Borders, dividers |

This color system creates a cohesive, professional, and accessible design that maintains visual hierarchy while providing a calm and readable experience for users.

## Markdown Content Styling

When rendering markdown/MDX content, all elements should follow a consistent styling approach that maintains the design system's color palette and typography principles.

### Prose Container

All markdown content should be wrapped in a prose container with the following characteristics:

- **Base Text**: `text-davy_gray` with `text-base` size
- **Line Height**: `leading-relaxed` (1.625) for optimal readability
- **Max Width**: `max-w-none` to allow full-width content
- **Spacing**: Consistent vertical rhythm using margin utilities

### Typography Hierarchy

#### Headings

All headings use the `payne_gray` color and follow a clear size hierarchy:

- **H1**: `text-4xl` (36px), `font-light`, `mb-6`, `mt-8`, `leading-tight`
- **H2**: `text-3xl` (30px), `font-light`, `mb-5`, `mt-7`, `leading-tight`
- **H3**: `text-2xl` (24px), `font-normal`, `mb-4`, `mt-6`, `leading-snug`
- **H4**: `text-xl` (20px), `font-medium`, `mb-3`, `mt-5`, `leading-snug`
- **H5**: `text-lg` (18px), `font-medium`, `mb-3`, `mt-4`, `leading-normal`
- **H6**: `text-base` (16px), `font-semibold`, `mb-2`, `mt-4`, `leading-normal`

**Important**: First heading (when it immediately follows the prose container) should have `first:mt-0` to prevent excessive top margin.

#### Paragraphs

- **Base Style**: `mb-4`, `leading-relaxed`
- **Color**: Inherits `text-davy_gray` from prose container
- **Last Child**: No bottom margin (`last:mb-0`)

#### Links

- **Default**: `text-thistle`, `underline`, `decoration-thistle/30`
- **Hover**: `hover:text-thistle-600`, `hover:decoration-thistle/60`
- **Transition**: `transition-colors duration-200`
- **Focus**: `focus:outline-none focus:ring-2 focus:ring-thistle/50 focus:ring-offset-2`

### Lists

#### Unordered Lists
- **Container**: `mb-4`, `ml-6`, `list-disc`
- **Nested Lists**: `mt-2`, `ml-6`
- **List Items**: `mb-2`, `leading-relaxed`, `pl-1`

#### Ordered Lists
- **Container**: `mb-4`, `ml-6`, `list-decimal`
- **Nested Lists**: `mt-2`, `ml-6`
- **List Items**: `mb-2`, `leading-relaxed`, `pl-1`

### Code Elements

#### Inline Code
- **Background**: `bg-platinum/20`
- **Text**: `text-payne_gray-700`
- **Padding**: `px-1.5 py-0.5`
- **Border Radius**: `rounded`
- **Font Size**: `text-sm`
- **Font Family**: Monospace (default)

#### Code Blocks
- **Background**: `bg-payne_gray-900`
- **Text**: `text-alice_blue-800`
- **Padding**: `p-4`
- **Border Radius**: `rounded-lg`
- **Margin**: `mb-4`
- **Overflow**: `overflow-x-auto`
- **Font Size**: `text-sm`
- **Line Height**: `leading-relaxed`

### Blockquotes

- **Border**: `border-l-4 border-thistle`
- **Background**: `bg-platinum/10`
- **Padding**: `pl-4 py-2 pr-4`
- **Margin**: `my-6`
- **Text Style**: `italic text-davy_gray/90`
- **Nested Elements**: Paragraphs within blockquotes should have reduced bottom margin

### Tables

#### Table Container
- **Margin**: `my-6`
- **Overflow**: `overflow-x-auto`

#### Table Element
- **Width**: `w-full`
- **Border Collapse**: `border-collapse`
- **Text Size**: `text-sm`

#### Table Header
- **Background**: `bg-platinum/20`
- **Border**: `border-b-2 border-platinum`

#### Table Header Cells
- **Padding**: `px-4 py-3`
- **Text**: `text-left font-semibold text-payne_gray`

#### Table Body Rows
- **Border**: `border-b border-platinum/40`
- **Hover**: `hover:bg-platinum/5 transition-colors duration-150`

#### Table Data Cells
- **Padding**: `px-4 py-3`
- **Text**: `text-davy_gray`

### Horizontal Rules

- **Margin**: `my-8`
- **Border**: `border-platinum/40`
- **Style**: `border-t`

### Images

- **Margin**: `my-6`
- **Border Radius**: `rounded-lg`
- **Max Width**: `w-full`
- **Height**: `h-auto`
- **Border**: `border border-platinum/40` (optional, for framed look)

### Strong/Bold Text

- **Font Weight**: `font-semibold`
- **Color**: `text-payne_gray` (slightly darker than body text)

### Emphasis/Italic Text

- **Font Style**: `italic`
- **Color**: Inherits from parent

### Implementation Notes

1. **Prose Wrapper**: Use the `prose` class name or a custom `markdown-content` class as the main container
2. **Scoped Styles**: All markdown styles should be scoped to the prose container to avoid affecting other components
3. **Responsive Design**: Font sizes and spacing should be responsive where appropriate
4. **Dark Mode Ready**: While not currently implemented, the color system is prepared for dark mode
5. **Accessibility**: Ensure sufficient contrast ratios and focus states for all interactive elements

### Example Implementation

```astro
<div class="prose prose-custom">
  <h1>Main Article Heading</h1>
  <p>Article paragraph with <a href="#">styled links</a> and <code>inline code</code>.</p>
  
  <h2>Subheading</h2>
  <ul>
    <li>List item one</li>
    <li>List item two</li>
  </ul>
  
  <blockquote>
    <p>A meaningful quote that stands out from the content.</p>
  </blockquote>
  
  <pre><code>// Code block example
const greeting = "Hello, World!";
console.log(greeting);</code></pre>
</div>
```

### CSS Classes Quick Reference

Apply these classes to the prose container or define them in a global stylesheet:

- **Container**: `prose max-w-none text-davy_gray text-base leading-relaxed`
- **Headings**: All use `text-payne_gray` with varying sizes and weights
- **Links**: `text-thistle underline hover:text-thistle-600`
- **Code**: Inline uses `bg-platinum/20`, blocks use `bg-payne_gray-900`
- **Blockquotes**: `border-l-4 border-thistle bg-platinum/10`
- **Tables**: `border-platinum/40` for borders, `bg-platinum/20` for headers