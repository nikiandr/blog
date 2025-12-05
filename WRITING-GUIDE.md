# Writing Guide

This guide documents the components, patterns, and typography features available for writing blog posts.

## Table of Contents

- [Getting Started](#getting-started)
- [MDX Components](#mdx-components)
  - [Sidenote](#sidenote)
  - [Marginnote](#marginnote)
  - [Figure](#figure)
  - [Epigraph](#epigraph)
- [Typography Classes](#typography-classes)
  - [Drop Caps](#drop-caps)
  - [Small Caps](#small-caps)
  - [Newthought](#newthought)
- [Prose Styling](#prose-styling)
- [External Links](#external-links)
- [Best Practices](#best-practices)

---

## Getting Started

Blog posts are written in MDX format and stored in `src/articles/`. Each post requires frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description for previews and SEO"
pubDate: 2025-01-15
draft: false  # Set to true to hide from production
coverImage: ./optional-cover.jpg  # Optional
coverImageAlt: "Image description"  # Required if coverImage is set
---
```

To use MDX components, import them at the top of your file after the frontmatter:

```mdx
---
title: "My Post"
description: "Description"
pubDate: 2025-01-15
---
import Sidenote from '../components/mdx/Sidenote.astro';
import Marginnote from '../components/mdx/Marginnote.astro';
import Figure from '../components/mdx/Figure.astro';
import Epigraph from '../components/mdx/Epigraph.astro';

Your content here...
```

---

## MDX Components

### Sidenote

Numbered notes that appear in the margin on desktop (1280px+) and as expandable inline notes on mobile. Inspired by [Gwern.net](https://gwern.net/sidenote) and [Tufte CSS](https://edwardtufte.github.io/tufte-css/).

**Props:**
- `id` (required): Unique identifier for the sidenote

**Usage:**
```mdx
import Sidenote from '../components/mdx/Sidenote.astro';

The web is fundamentally different from print<Sidenote id="1">Edward Tufte's work on information design has heavily influenced modern web typography.</Sidenote>, yet many of the same principles apply.
```

**Behavior:**
- Desktop: Floats to the right margin with a subtle left border
- Mobile: Hidden by default, click the superscript number to expand
- Auto-numbered using CSS counters

---

### Marginnote

Unnumbered margin notes for parenthetical asides. Less intrusive than sidenotes.

**Props:**
- `id` (optional): Anchor ID for linking

**Usage:**
```mdx
import Marginnote from '../components/mdx/Marginnote.astro';

<Marginnote>This is a brief aside that provides context without interrupting the main text.</Marginnote>

The main text continues here without any numbered reference.
```

**When to use:**
- Brief contextual information
- Definitions or clarifications
- When numbering would be distracting

---

### Figure

Images with proper semantic markup and captions.

**Props:**
- `src` (required): Imported image reference
- `alt` (required): Accessibility description
- `caption` (optional): Caption text below the image
- `wide` (optional): Set to `true` for full-width images that extend beyond the content column

**Usage:**
```mdx
import Figure from '../components/mdx/Figure.astro';
import myImage from '../assets/example.jpg';

<Figure
  src={myImage}
  alt="A descriptive alt text"
  caption="Figure 1: This appears below the image"
/>

<!-- Wide figure that extends into margins -->
<Figure
  src={myImage}
  alt="Panoramic view"
  caption="A wider perspective"
  wide={true}
/>
```

**Note:** Images must be imported before use. Place images in `src/assets/` or reference them relative to your article.

---

### Epigraph

Opening quotes in the style of Edward Tufte's handouts. Best used at the beginning of an article or section.

**Props:**
- `cite` (optional): Attribution for the quote

**Usage:**
```mdx
import Epigraph from '../components/mdx/Epigraph.astro';

<Epigraph cite="Edward Tufte">
  The minimum we should hope for with any display technology is that it should do no harm.
</Epigraph>

<!-- Multiple epigraphs -->
<Epigraph cite="Blaise Pascal">
  I have made this longer than usual because I have not had time to make it shorter.
</Epigraph>

<Epigraph cite="Antoine de Saint-Exupéry">
  Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
</Epigraph>
```

---

## Typography Classes

These classes can be applied using HTML within your MDX files.

### Drop Caps

Large decorative first letter, traditionally used in books and manuscripts.

**Usage:**
Add the `drop-cap` class to your article's prose container. This is typically done in the layout, but you can wrap content manually:

```mdx
<article class="prose drop-cap">

Once upon a time, in a land far away, there lived a programmer who dreamed of perfect typography...

</article>
```

**Result:** The "O" in "Once" becomes a large, decorative capital letter.

---

### Small Caps

Used for acronyms, abbreviations, or stylistic emphasis. Provides a more refined appearance than all-caps.

**Usage:**
```mdx
The <span class="small-caps">HTML</span> specification defines how web pages are structured.

We use <span class="small-caps">CSS</span> for styling and <span class="small-caps">JavaScript</span> for interactivity.
```

---

### Newthought

Tufte-style section openers. Used to begin a new train of thought without a full heading.

**Usage:**
```mdx
<span class="newthought">In the beginning</span> there was chaos. Then came structure, and with structure came understanding.

<span class="newthought">Consider the alternative:</span> what if we approached the problem from a different angle entirely?
```

**Best for:**
- Starting new paragraphs with thematic shifts
- Drawing attention to key statements
- Creating visual rhythm without adding headings

---

## Prose Styling

The `.prose` class is automatically applied to blog post content. It provides:

### Headings
- **H1**: 2.5rem, normal weight, tight tracking
- **H2**: 2rem, normal weight
- **H3**: 1.5rem, medium weight
- **H4-H6**: Progressively smaller

### Paragraphs
- 18px base font size
- 1.75 line height for comfortable reading
- 6-unit bottom margin

### Links
- Burgundy accent color (#8b4049)
- Subtle underline that strengthens on hover
- External links automatically get a `↗` indicator

### Blockquotes
Classic book styling:
```mdx
> The web is not print. Webpages are not books.
>
> <cite>Tufte CSS</cite>
```

### Code
- Inline: `code` gets a warm background
- Blocks: Dark background with proper syntax contrast

### Lists
Standard bullet and numbered lists with proper nesting support.

---

## External Links

External links (those starting with `http` and not pointing to your domain) automatically receive a small arrow indicator (`↗`). This follows [Gwern's design principle](https://gwern.net/design) of helping readers understand where links lead.

**Automatic behavior:**
```mdx
Check out [Gwern's sidenote essay](https://gwern.net/sidenote) for more details.
```

Renders with: "Check out Gwern's sidenote essay↗ for more details."

Internal links remain undecorated:
```mdx
See my [photos](/photos) for travel albums.
```

---

## Best Practices

### Information Architecture

Follow the "iceberg" model from Gwern.net:

1. **Title & Introduction**: Clear, concise summary
2. **Main text**: Core content in flowing paragraphs
3. **Sidenotes**: Brief digressions (≤200 words)
4. **Margin notes**: Contextual asides
5. **Figures**: Visual support integrated with text

### When to Use Each Note Type

| Type | Use For | Numbered? | Desktop Position |
|------|---------|-----------|------------------|
| Sidenote | Citations, elaborations, tangents | Yes | Right margin |
| Marginnote | Context, definitions, brief asides | No | Right margin |
| Blockquote | Direct quotations in main text | N/A | Inline |
| Epigraph | Opening quotes setting tone | N/A | Full width |

### Writing Tips

1. **Keep sidenotes concise**: If it's longer than ~200 words, it should probably be in the main text or an appendix.

2. **Use margin notes sparingly**: They're powerful but can become distracting if overused.

3. **Alt text matters**: Always provide meaningful alt text for figures—it helps accessibility and SEO.

4. **Epigraphs set tone**: Choose opening quotes that genuinely relate to your content, not just impressive-sounding ones.

5. **Progressive enhancement**: Content should be readable without JavaScript. All components degrade gracefully.

### Example Structure

```mdx
---
title: "On Typography"
description: "Exploring the principles of good web typography"
pubDate: 2025-01-15
---
import Epigraph from '../components/mdx/Epigraph.astro';
import Sidenote from '../components/mdx/Sidenote.astro';
import Figure from '../components/mdx/Figure.astro';

<Epigraph cite="Robert Bringhurst">
  Typography exists to honor content.
</Epigraph>

<span class="newthought">Good typography</span> is invisible. It serves the reader without calling attention to itself<Sidenote id="1">This principle comes from Beatrice Warde's famous essay "The Crystal Goblet."</Sidenote>.

The fundamentals haven't changed much since Gutenberg...

## The Digital Challenge

When we moved to screens, we brought our assumptions with us...
```

---

## File Locations

- **Articles**: `src/articles/*.mdx`
- **Components**: `src/components/mdx/`
- **Styles**: `src/styles/global.css`
- **Layouts**: `src/layouts/`

---

## Resources

- [Gwern.net Design](https://gwern.net/design) - Inspiration for sidenotes and typography
- [Tufte CSS](https://edwardtufte.github.io/tufte-css/) - Edward Tufte's design principles for the web
- [Butterick's Practical Typography](https://practicaltypography.com/) - Comprehensive typography guide
