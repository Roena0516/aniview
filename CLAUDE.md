# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

이 서비스는 일본 애니메이션의 티어표를 구성하고, URL을 통해 다른 사람과 공유할 수 있는 서비스다.

# Design System

This design system is based on [maimai.shiftpsh.com](https://maimai.shiftpsh.com/ko/profile/roena/home) for consistent UI/UX.
maimai.shiftpsh.com 사이트의 디자인을 확인하고 싶다면 curl로 접속

## Colors

```css
/* Primary Colors (extracted from actual website) */
--background: #f7f8f9;
--card-background: #ffffff;
--border: #dddfe0;
--text-primary: #000000;
--text-secondary: #8a8f95;

/* Button Colors */
--button-background: #f7f8f9;
--button-text: #000000;
--button-hover-background: #dadfe3;
--button-hover-text: #000000;
--button-hover-shadow: rgba(218, 223, 227, 0.4) 0px 4px 8px;
--button-active-shadow: rgba(218, 223, 227, 0.4) 0px 2px 4px;

/* Tier Colors (E to SSS) */
--tier-e: #f5f5f5;
--tier-d: #e0e0e0;
--tier-c: #fff9c4;
--tier-b: #fad7a0;
--tier-a: #f9cbb9;
--tier-s: #d7bde2;
--tier-ss: #aed6f1;
--tier-sss: #d5f5e3;

/* Scrollbar Colors */
--scrollbar-thumb: #dddfe0;
--scrollbar-track: #ffffff;

/* Selection Color */
--selection-background: rgba(0, 0, 0, 0.5);
--selection-text: #ffffff;
```

## Typography

```css
/* Font Family (extracted from actual website) */
font-family: "Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

/* For Japanese variant */
font-family: "Pretendard JP Variable", "Pretendard JP", "Pretendard Variable",
             Pretendard, Inter, "Noto Sans JP", -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

/* Monospace Font */
font-family: "JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace;

/* Font Weights */
--font-weight-normal: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;

/* Font Sizes */
--font-size-xs: 75%;      /* 11-12px - captions, small text */
--font-size-sm: 80%;      /* ~13px - secondary info */
--font-size-base: 100%;   /* 16px - body text */
--font-size-lg: 160%;     /* ~26px - large headings */
--font-size-xl: 200%;     /* ~32px - extra large headings */

/* Line Heights */
--line-height-tight: 1;
--line-height-normal: 1.6;
--line-height-relaxed: 1.2;
```

## Card Components

### Large Card (Grid View)
- Thumbnail with square aspect ratio
- Level badge at bottom-left corner
- Achievement badges (SSS+, FC+, etc.) on right side
- Title below thumbnail
- Shadow: `0 2px 4px rgba(0, 0, 0, 0.1)`
- Border radius: 4px

### Medium Card (List View)
- Left: Small thumbnail (80-100px) with level badge
- Center: Song title + Artist name (vertical stack)
- Right: Achievement badges + Accuracy percentage
- Full width layout
- Border: 1px solid #DDDFE0

### Small Card (Table/Tier Row)
- Rank number
- Level badge
- Difficulty indicator
- Title
- Achievement badges
- Accuracy
- Compact horizontal layout

## Tier List Design

Based on screenshot analysis, tier list should have:
- Fixed-width tier label on left (120px)
- Each tier has unique background color (see Tier Colors above)
- Large content area on right for anime thumbnails
- Thumbnails arranged in flexible grid (gap: 8px)
- Thumbnail size: 80-100px width with 3:4 aspect ratio
- Anime title below thumbnail (11-12px, 2-line clamp)

## Layout System

```css
/* Container (extracted from actual website) */
--container-width: 1200px;
max-width: var(--container-width);
padding: 0 16px;
margin: 0 auto;

/* Spacing Scale */
--spacing-xs: 4px;    /* tight spacing */
--spacing-sm: 8px;    /* inline elements, grid gap */
--spacing-md: 16px;   /* card padding, list items */
--spacing-lg: 24px;   /* between major components */
--spacing-xl: 32px;   /* page sections */
--spacing-2xl: 60px;  /* large sections */

/* Additional specific spacings from website */
--nav-height: 72px;
--icon-size-sm: 32px;
--icon-size-md: 48px;
--icon-size-lg: 96px;

/* Border Radius */
--radius-sm: 4px;         /* cards, buttons, inputs */
--radius-md: 0.2em;       /* badges */
--radius-full: 9999px;    /* circular buttons */

/* Shadows (extracted from actual website) */
--shadow-card: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-card-hover: 0 4px 8px rgba(0, 0, 0, 0.2);
--shadow-button-hover: rgba(218, 223, 227, 0.4) 0px 4px 8px;
--shadow-button-active: rgba(218, 223, 227, 0.4) 0px 2px 4px;
--shadow-inset: inset 0 0 0.2em rgba(255, 255, 255, 0.8);

/* Grid System */
grid-template-columns: repeat(3, 1fr);  /* 3-column grid for buttons */
gap: 8px;

/* Responsive Breakpoints */
@media (max-width: 640px) { /* mobile */ }
@media (max-width: 480px) { /* small mobile */ }
@media (max-width: 1024px) { /* tablet */ }
```

## Interaction Patterns

```css
/* Transitions (extracted from actual website) */
transition: background-color 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;

/* Shorter transitions for specific elements */
transition: opacity 0.2s ease,
            border-color 0.2s ease;

/* Hover Effects */
/* Buttons */
button:hover {
  background: var(--button-hover-background);
  box-shadow: var(--button-hover-shadow);
  transform: translate(0, -4px);
}

button:active {
  box-shadow: var(--button-active-shadow);
  transform: translate(0, -2px);
}

/* Cards */
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

/* Draggable items */
[draggable="true"] {
  cursor: grab;
}

[draggable="true"]:active {
  cursor: grabbing;
}

/* Remove button */
.remove-button {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.card:hover .remove-button {
  opacity: 1;
}

/* Disabled state */
:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

## Global Styles

```css
/* CSS Reset & Base Styles (extracted from actual website) */
* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  width: 100%;
  background: #f7f8f9;
}

body {
  margin: 0;
  width: 100%;
  line-height: 1.6;
  color: #000000;
  background: #ffffff;
  scrollbar-width: thin;
  scrollbar-color: #dddfe0 #ffffff;
}

/* Text Selection */
::selection {
  color: #ffffff;
  background: rgba(0, 0, 0, 0.5);
}

/* Links */
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Text Styles */
b, strong {
  font-weight: 700;
}

i, em {
  font-style: italic;
}

small {
  font-size: 75%;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #ffffff;
  border-left: 1px #dddfe0 dashed;
}

::-webkit-scrollbar-thumb {
  background: #dddfe0;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #dddfe0;
}
```

## Design Tokens Reference

When implementing components, use these exact values from the actual website:

```typescript
// colors.ts - Design tokens
export const colors = {
  background: '#f7f8f9',
  cardBackground: '#ffffff',
  border: '#dddfe0',
  textPrimary: '#000000',
  textSecondary: '#8a8f95',

  button: {
    background: '#f7f8f9',
    text: '#000000',
    hoverBackground: '#dadfe3',
    hoverText: '#000000',
    hoverShadow: 'rgba(218, 223, 227, 0.4) 0px 4px 8px',
    activeShadow: 'rgba(218, 223, 227, 0.4) 0px 2px 4px',
  },

  tier: {
    E: '#f5f5f5',
    D: '#e0e0e0',
    C: '#fff9c4',
    B: '#fad7a0',
    A: '#f9cbb9',
    S: '#d7bde2',
    SS: '#aed6f1',
    SSS: '#d5f5e3',
  },
};

// spacing.ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '60px',
};

// typography.ts
export const typography = {
  fontFamily: {
    base: '"Pretendard", "Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", "Noto Sans KR", "Consolas", "Courier New", Courier, monospace',
  },
  fontSize: {
    xs: '75%',   // ~12px
    sm: '80%',   // ~13px
    base: '100%', // 16px
    lg: '160%',  // ~26px
    xl: '200%',  // ~32px
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1,
    normal: 1.6,
    relaxed: 1.2,
  },
};

// shadows.ts
export const shadows = {
  card: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cardHover: '0 4px 8px rgba(0, 0, 0, 0.2)',
  buttonHover: 'rgba(218, 223, 227, 0.4) 0px 4px 8px',
  buttonActive: 'rgba(218, 223, 227, 0.4) 0px 2px 4px',
  inset: 'inset 0 0 0.2em rgba(255, 255, 255, 0.8)',
};
```

# MCP Servers

## Figma Dev Mode MCP Rules

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- IMPORTANT: If the Figma Dev Mode MCP Server returns a localhost source for an image or an SVG, use that image or SVG source directly
- IMPORTANT: DO NOT import/add new icon packages, all the assets should be in the Figma payload
- IMPORTANT: do NOT use or create placeholders if a localhost source is provided

# Tech Stack

- **Development**: Next.js, TypeScript
- **Styling**: @emotion/css with CSS-in-JS pattern
- **API Request**: axios, @tanstack/react-query
- **Animation** : motion

# Directory Architecture

```
aniview/
├── public/ /* statical assets e.g. png, jpg, ... */
├── src/
│   ├── app/
│   │   ├── [pageName]/
│   │   │   ├── _features/
│   │   │   │   ├── ui/
│   │   │   │   │   └── /* being used component in [pageName], If you implement page component, you can naming [pageName]PageView.tsx with camelcase */
│   │   │   │   ├── lib/
│   │   │   │   │   ├── assets/ /* if you need use svg, you can make svg component file with `index.ts` barrel file. Please use svg by tsx module */
│   │   │   │   │   └── hooks/ /* being used custom hook in [pageName] */
│   │   │   ├── _entities/
│   │   │   │   ├── model/
│   │   │   │   │   └── /* being used type or interface in api call, e.g. response dto, request dto, or just model, etc. you can naming 'types.ts', 'dto.ts' and export it. (do not use `export default`) */
│   │   │   │   ├── api/
│   │   │   │   │   ├── axios.ts /* axios function group */
│   │   │   │   │   └── queries.ts /* React Query group object with use `queryOptions` in @tanstack/react-query. if you need declare useMutation, you can declare in this file. but mutation don't have `mutationOptions`, So you should use type annotation with `MutationOptions` type. */
│   │   │   └── page.tsx /* just export in _features/ui/[pageName]PageView.tsx. page.tsx's component should use type annotation with 'NextPage' in 'next'. */
│   │   └── page.tsx
│   ├── shared/
│   │   ├── components/ /* shared components in feature page */
│   │   └── hooks/ /* shared hooks in feature page */
```

# Implement

- Each page is managed via [pageName] directory in `src/app`.
- If you need implement some page, follow Directory Architecture rules.
- You should declare model and api when you need implement some page. see the figma design and judgment what data is necessary.
- If you think it is a frequently used component, such as a button or input, please implement it flexibly in shared so that the component can be commonly used.

# Avoid Pattern

- Do not use any type. If need some interface or type, you can write [feature page name]/types.ts and export it.
- You can use gap or empty `h-{} div` instead of margin and padding. Please avoid margin/padding styling pattern as you can.
- If a component file has more than 150 lines of code, please separate the hooks or components into modules.
- Do not use `React.[module]` pattern. please just import and use it.
- Do not use inline function. please make a handler function and use it. you can naming function with this rule via `'handle'{target}{eventName}` e.g. handleCTAButtonClick, handleAgeInputChange, etc.
- Do not use inline style css.
- If you need assets, use can copy as SVG code in figma. do not implement yourself asset file, just use svg and convert to svg component.
- Please avoid publish with `relative`, `absolute`. you can use flex and grid tailwindcss keyword.