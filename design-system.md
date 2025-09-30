****# Design System Documentation

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
