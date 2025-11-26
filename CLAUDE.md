# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog and photo gallery site built with **Astro 5**, featuring a content-focused design with dark mode support. The site uses Astro's Content Collections API for managing blog posts and photo albums, with React components for interactive features like the PhotoSwipe gallery.

## Development Commands

All commands run from the project root:

- **`npm run dev`** - Start dev server at `localhost:4321`
- **`npm run build`** - Build production site to `./dist/`
- **`npm run preview`** - Preview production build locally
- **`npx ultracite fix`** - Format and auto-fix linting issues (run before committing)
- **`npx ultracite check`** - Check for code quality issues without fixing

## Architecture

### Content Collections

The site uses Astro's Content Collections API (defined in `src/content.config.ts`) with two collections:

1. **`blog`** collection:
   - Source: `src/articles/*.{md,mdx}`
   - Schema: `title`, `description`, `pubDate`, `draft` (optional), `coverImage` (optional), `coverImageAlt` (optional)
   - Rendered at: `/blog/[slug]` via dynamic routing
   - Supports MDX for rich interactive content

2. **`albums`** collection:
   - Source: `src/albums/[album-name]/album.json` + image files in same directory
   - Schema: `title`, `description`, `pubDate`, `draft` (optional), `tripDates` (array of 2 dates), `coverPhoto` (image), `photos` (array of `{photo: image, description: string}`)
   - Rendered at: `/photos/[album]` via dynamic routing
   - Uses Astro's `image()` schema helper for optimized image handling

### Photo Gallery System

The gallery uses a hybrid Astro + React architecture:

1. **`GalleryWrapper.astro`**: Server-side component that transforms Astro image metadata into gallery format
2. **`Gallery.tsx`**: React component (rendered with `client:only="react"`) that initializes PhotoSwipe lightbox
3. **`src/libs/gallery/transform.ts`**: Transforms Astro's ImageMetadata into the GalleryImage format with thumbnail and lightbox variants

The gallery grid uses Tailwind CSS with responsive auto-rows and dynamic column spans based on image aspect ratios.

### Theming & Dark Mode

Dark mode is implemented with:
- Tailwind's `class` strategy (`darkMode: "class"` in `tailwind.config.js`)
- Custom color palette with light mode (alice_blue, platinum, davy_gray) and dark mode (dark_slate, silver_gray) variants
- Theme preference stored in `localStorage` with three modes: `"light"`, `"dark"`, `"system"`
- Inline script in `layout.astro` prevents FOUC by applying dark class before hydration
- Theme persistence across page transitions handled via Astro's `astro:before-swap` event

### Page Structure

- **`src/layouts/layout.astro`**: Base layout with dark mode script, favicon links, and TopBar navigation
- **`src/pages/index.astro`**: Homepage
- **`src/pages/blog/index.astro`**: Blog listing page
- **`src/pages/blog/[slug].astro`**: Individual blog post with table of contents
- **`src/pages/photos/index.astro`**: Photo albums listing
- **`src/pages/photos/[album].astro`**: Individual photo album gallery
- **`src/pages/about-me/index.astro`**: About page
- **`src/pages/contact/index.astro`**: Contact page

Blog posts include a sticky table of contents on desktop that's pushed into the right margin space using negative margins.

### Styling

- **Tailwind CSS 4** (using `@tailwindcss/vite` plugin) for utility-first styling
- Custom color system in `tailwind.config.js` with extended palette
- **Inter Tight** font from `@fontsource` as the primary sans-serif
- Global styles in `src/styles/global.css`
- Smooth dark mode transitions with `transition-colors duration-300` classes

### Static Site Generation

All pages are statically generated at build time using Astro's `getStaticPaths()`:
- Blog posts filter out drafts: `getCollection("blog", ({ data }) => !data.draft)`
- Albums filter out drafts: `getCollection("albums", ({ data }) => !data.draft)`
- Dynamic routes are pre-rendered based on collection entries

### View Transitions

The site uses Astro's View Transitions API (`<ClientRouter/>` in layout) for SPA-like navigation with prefetching enabled in `astro.config.mjs`.

## Code Quality

This project uses **Ultracite** (a Biome preset) for formatting and linting. Always run `npx ultracite fix` before committing. The project enforces:
- TypeScript strict mode (`strictNullChecks: true`)
- Lint-staged integration: auto-fixes files on commit
- See `.claude/CLAUDE.md` (the Ultracite rules file) for detailed code standards

## Content Management

To add new blog posts:
1. Create `.md` or `.mdx` file in `src/articles/`
2. Include required frontmatter: `title`, `description`, `pubDate`
3. Optionally add `draft: true` to hide from production, or `coverImage` and `coverImageAlt` for cover images

To add new photo albums:
1. Create directory in `src/albums/[album-name]/`
2. Add `album.json` with required fields
3. Place image files in the same directory
4. Reference images by filename in the `photos` array

## Key Dependencies

- **Astro 5.15+**: Core framework with Content Collections and View Transitions
- **React 19**: For interactive components (Gallery)
- **Tailwind CSS 4**: Utility-first styling
- **PhotoSwipe 5**: Touch-enabled lightbox gallery
- **Ultracite/Biome**: Zero-config formatting and linting
