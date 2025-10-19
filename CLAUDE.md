# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

이 서비스는 일본 애니메이션의 티어표를 구성하고, 다른 사람과 공유할 수 있는 서비스다.

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