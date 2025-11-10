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

1. **Dark Mode First**: ALWAYS include dark mode color variants when styling ANY component or element. Every color class must have a corresponding `dark:` variant. This is non-negotiable.
2. **Consistency**: Always use the predefined color names from the palette
3. **Hierarchy**: Maintain the established color hierarchy (payne_gray > davy_gray > davy_gray/80 in light mode; silver_gray > silver_gray-500 > silver_gray-700 in dark mode)
4. **Interactions**: Use `thistle` for hover states and interactive elements in light mode, `midnight_purple` in dark mode
5. **Backgrounds**: Stick to `alice_blue` for main backgrounds and `white/50` for content areas in light mode; `dark_slate` and `dark_slate-400` in dark mode
6. **Borders**: Use `platinum` with appropriate opacity for all border elements in light mode; `slate_border` in dark mode
7. **Transitions**: Include `transition-colors duration-200` for smooth color changes
8. **Complete Coverage**: Every text color, background color, border color, and hover state MUST have both light and dark mode variants

## Color Tokens Quick Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `alice_blue` | `#f4faff` | Main backgrounds |
| `payne_gray` | `#4f646f` | Headings, primary text |
| `davy_gray` | `#535657` | Body text |
| `thistle` | `#b7adcf` | Hover states, accents |
| `platinum` | `#dee7e7` | Borders, dividers |

This color system creates a cohesive, professional, and accessible design that maintains visual hierarchy while providing a calm and readable experience for users.

## Dark Mode Color Palette

**CRITICAL REQUIREMENT**: Dark mode support is MANDATORY for all styling work. When creating or modifying ANY component, you MUST include dark mode variants for ALL color-related classes. There are no exceptions to this rule.

The dark mode palette is carefully crafted to maintain the same visual hierarchy and sophistication as the light mode while following dark mode best practices.

### Dark Mode Design Principles

1. **Avoid Pure Black**: Uses `#0f1419` as the base to reduce eye strain and provide better contrast control
2. **Surface Elevation**: Lighter backgrounds indicate elevated surfaces (cards, modals)
3. **Reduced Contrast**: Text colors are softer (#d4dce4) compared to pure white
4. **Color Preservation**: Maintains the same color relationships and hierarchy
5. **Accessibility First**: All combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)

### Dark Mode Color Definitions

Add these to `tailwind.config.js` under theme.extend.colors:

```javascript
'dark_slate': {
  DEFAULT: '#0f1419',
  100: '#0a0d11',
  200: '#0f1419',
  300: '#151b21',
  400: '#1a1f26',
  500: '#20252d',
  600: '#252b34',
  700: '#2d3540',
  800: '#374150',
  900: '#434d5e'
},
'silver_gray': {
  DEFAULT: '#d4dce4',
  100: '#f0f3f6',
  200: '#e8eff6',
  300: '#d4dce4',
  400: '#c5cdd7',
  500: '#b4bcc4',
  600: '#a3abb3',
  700: '#919aa3',
  800: '#7f8891',
  900: '#6d7680'
},
'midnight_purple': {
  DEFAULT: '#c7b8e5',
  100: '#f3f0fa',
  200: '#e7e0f5',
  300: '#d7cceb',
  400: '#c7b8e5',
  500: '#b7a4df',
  600: '#a790d9',
  700: '#977cd3',
  800: '#8768cd',
  900: '#7754c7'
},
'slate_border': {
  DEFAULT: '#2d3540',
  100: '#434d5e',
  200: '#3e4856',
  300: '#38424f',
  400: '#333c48',
  500: '#2d3540',
  600: '#282f39',
  700: '#232932',
  800: '#1e232b',
  900: '#191d24'
}
```

### Dark Mode Semantic Mappings

#### Navigation (Dark Mode)
- Background: `bg-dark_slate`
- Links: `text-silver_gray`
- Hover: `hover:text-midnight_purple`
- Border: `border-slate_border/50`

#### Content Areas (Dark Mode)
- Background: `bg-dark_slate-400` (elevated surface)
- Border: `border-slate_border/60`
- Headings: `text-silver_gray`
- Body text: `text-silver_gray-500`
- Subtle text: `text-silver_gray-700`

#### Layout (Dark Mode)
- Main background: `bg-dark_slate`
- Text color: `text-silver_gray-500`

### Dark Mode Usage Guidelines

#### Primary Text Hierarchy
1. **Headings**: `text-silver_gray` (lightest, most prominent)
2. **Body Text**: `text-silver_gray-500` (medium light)
3. **Secondary Text**: `text-silver_gray-700` (muted)
4. **Disabled/Placeholder**: `text-silver_gray-800` (subtle)

#### Background Layers
1. **Base Layer**: `bg-dark_slate` (#0f1419)
2. **Elevated Layer**: `bg-dark_slate-400` (#1a1f26)
3. **Floating/Modal**: `bg-dark_slate-500` (#20252d)
4. **Hover State**: `bg-dark_slate-600` (#252b34)

#### Interactive Elements
- **Links**: `text-midnight_purple` with `hover:text-midnight_purple-600`
- **Buttons**: `bg-midnight_purple-500` with `hover:bg-midnight_purple-600`
- **Focus Rings**: `ring-midnight_purple/50`
- **Borders**: `border-slate_border` with varying opacity

### Dark Mode Implementation Examples

#### Navigation Component (Dark Mode)
```astro
<nav class="w-full px-6 py-4 bg-dark_slate border-b border-slate_border/50">
  <a href="#" class="text-silver_gray hover:text-midnight_purple transition-colors duration-200">
    Link Text
  </a>
</nav>
```

#### Content Card (Dark Mode)
```astro
<div class="bg-dark_slate-400 rounded border border-slate_border/60 p-6">
  <h1 class="text-5xl font-light text-silver_gray mb-4">
    Main Heading
  </h1>
  <p class="text-xl text-silver_gray-700 max-w-lg mx-auto">
    Subtitle text
  </p>
  <p class="text-silver_gray-500 leading-normal mb-4 text-base">
    Body content
  </p>
</div>
```

#### Layout Structure (Dark Mode)
```astro
<body class="font-sans bg-dark_slate text-silver_gray-500 min-h-screen">
  <!-- Content here -->
</body>
```

### Dark Mode Toggle Implementation

```astro
<!-- In layout.astro head -->
<script is:inline>
  // Check for saved theme preference or default to light mode
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
</script>

<!-- Toggle button component -->
<button 
  id="theme-toggle"
  class="text-payne_gray dark:text-silver_gray hover:text-thistle dark:hover:text-midnight_purple transition-colors"
  aria-label="Toggle dark mode"
>
  <svg class="w-6 h-6 hidden dark:block"><!-- Moon icon --></svg>
  <svg class="w-6 h-6 block dark:hidden"><!-- Sun icon --></svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

### Markdown Content Styling (Dark Mode)

#### Prose Container (Dark Mode)
- **Base Text**: `dark:text-silver_gray-500`
- **Line Height**: Same as light mode (`leading-relaxed`)
- **Max Width**: `max-w-none`

#### Headings (Dark Mode)
All headings: `dark:text-silver_gray`

#### Links (Dark Mode)
- **Default**: `dark:text-midnight_purple dark:decoration-midnight_purple/30`
- **Hover**: `dark:hover:text-midnight_purple-600 dark:hover:decoration-midnight_purple/60`

#### Code Elements (Dark Mode)

##### Inline Code
- **Background**: `dark:bg-slate_border`
- **Text**: `dark:text-silver_gray-300`

##### Code Blocks
- **Background**: `dark:bg-dark_slate-100`
- **Text**: `dark:text-silver_gray-200`

#### Blockquotes (Dark Mode)
- **Border**: `dark:border-l-4 dark:border-midnight_purple`
- **Background**: `dark:bg-slate_border/30`
- **Text**: `dark:text-silver_gray-400`

#### Tables (Dark Mode)
- **Header Background**: `dark:bg-slate_border/40`
- **Border**: `dark:border-slate_border`
- **Row Hover**: `dark:hover:bg-slate_border/20`

### Accessibility in Dark Mode

- **Contrast Ratios**:
  - Headings (silver_gray on dark_slate): ~12:1 (AAA)
  - Body text (silver_gray-500 on dark_slate): ~8.5:1 (AAA)
  - Secondary text (silver_gray-700 on dark_slate): ~5.2:1 (AA)
  - Links (midnight_purple on dark_slate): ~7.8:1 (AAA)

- **Focus Indicators**: Enhanced visibility with `ring-midnight_purple/50`
- **Reduced Motion**: Respect `prefers-reduced-motion` for transitions

### Migration Checklist

To implement dark mode in your blog:

1. ✅ Add dark mode colors to `tailwind.config.js`
2. ✅ Enable dark mode in Tailwind config: `darkMode: 'class'`
3. ✅ Add dark mode variants to all components
4. ✅ Implement theme toggle with localStorage persistence
5. ✅ Test all interactive states (hover, focus, active)
6. ✅ Verify WCAG contrast requirements
7. ✅ Test with `prefers-color-scheme` media query
8. ✅ Update markdown/prose styles with dark variants

### Styling Checklist for Every Component

When styling ANY component or element, ensure you include:

- [ ] Text colors have `dark:` variants (e.g., `text-payne_gray dark:text-silver_gray`)
- [ ] Background colors have `dark:` variants (e.g., `bg-white/50 dark:bg-dark_slate-400`)
- [ ] Border colors have `dark:` variants (e.g., `border-platinum/40 dark:border-slate_border/60`)
- [ ] Hover states have `dark:` variants (e.g., `hover:text-thistle dark:hover:text-midnight_purple`)
- [ ] Focus states have `dark:` variants (e.g., `focus:ring-thistle/50 dark:focus:ring-midnight_purple/50`)
- [ ] Shadow values consider dark mode (e.g., `shadow-sm dark:shadow-slate_border/20`)

**Example of CORRECT styling (always do this):**
```astro
<div class="bg-white/50 dark:bg-dark_slate-400 border border-platinum/40 dark:border-slate_border/60 p-6 rounded-lg">
  <h2 class="text-payne_gray dark:text-silver_gray hover:text-thistle dark:hover:text-midnight_purple">
    Heading Text
  </h2>
  <p class="text-davy_gray dark:text-silver_gray-500">
    Body text
  </p>
</div>
```

**Example of INCORRECT styling (never do this):**
```astro
<!-- WRONG: Missing dark mode variants -->
<div class="bg-white/50 border border-platinum/40 p-6 rounded-lg">
  <h2 class="text-payne_gray hover:text-thistle">
    Heading Text
  </h2>
  <p class="text-davy_gray">
    Body text
  </p>
</div>
```

### Dark Mode Color Tokens Quick Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `dark_slate` | `#0f1419` | Main backgrounds (dark mode) |
| `silver_gray` | `#d4dce4` | Headings, primary text (dark mode) |
| `silver_gray-500` | `#b4bcc4` | Body text (dark mode) |
| `midnight_purple` | `#c7b8e5` | Hover states, accents (dark mode) |
| `slate_border` | `#2d3540` | Borders, dividers (dark mode) |

### Complete Class Reference

Apply dark mode variants to all existing classes:

```css
/* Container */
.prose {
  @apply dark:text-silver_gray-500;
}

/* Headings */
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply dark:text-silver_gray;
}

/* Links */
.prose a {
  @apply dark:text-midnight_purple dark:decoration-midnight_purple/30
         dark:hover:text-midnight_purple-600 dark:hover:decoration-midnight_purple/60;
}

/* Code */
.prose code {
  @apply dark:bg-slate_border dark:text-silver_gray-300;
}

.prose pre {
  @apply dark:bg-dark_slate-100 dark:text-silver_gray-200;
}

/* Blockquotes */
.prose blockquote {
  @apply dark:border-midnight_purple dark:bg-slate_border/30 dark:text-silver_gray-400;
}

/* Tables */
.prose table {
  @apply dark:border-slate_border;
}

.prose thead {
  @apply dark:bg-slate_border/40;
}

.prose tbody tr {
  @apply dark:border-slate_border dark:hover:bg-slate_border/20;
}
```

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