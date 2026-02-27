---
applyTo: "assets/**,_layouts/**,_includes/**,index.html"
description: "Frontend and layout standards for all HTML, CSS, and JS files"
---

# Frontend & Layout Standards

## HTML Rules
- Use semantic HTML5: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- All images must have descriptive `alt` attributes
- All external links: `target="_blank" rel="noopener noreferrer"`
- Use `data-category` attributes on SDK cards for JS filtering
- Use `aria-label` on icon-only buttons

## CSS Rules
- Use CSS custom properties (variables) for ALL colours — never hardcode hex in component styles
- Dark mode via `[data-theme="dark"]` selector on `<html>` element
- Mobile-first responsive design
- Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop), 1200px (wide)
- Transitions: `0.2s ease` for theme switching, `0.15s ease` for hover effects
- Never use `!important` unless overriding third-party styles
- All interactive elements must have visible focus states for accessibility

## JavaScript Rules
- Vanilla JS only — no frameworks
- All DOM queries at top of function, not inline
- Use `localStorage` for persisting user preferences (theme, search state)
- Initialise Fuse.js with: threshold 0.3, keys: [name, description, developer, category]
- Mermaid.js: initialise with `startOnLoad: true` and theme matching current colour scheme
- Always check `document.readyState` before DOM manipulation

## Performance Rules
- All CSS in one file: `assets/css/main.css`
- All JS in one file: `assets/js/main.js`
- Load Fuse.js and Mermaid.js from CDN with `defer` attribute
- Images: use `loading="lazy"` on all non-hero images
- Avoid inline styles — use CSS classes

## Accessibility Rules
- Colour contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- All interactive elements reachable by keyboard (Tab + Enter/Space)
- Skip navigation link as first element in `<body>`
- ARIA roles where semantic HTML is insufficient
