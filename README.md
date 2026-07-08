# Pogly Documentation

The official documentation site for [Pogly](https://cloud.pogly.gg), a free real-time collaborative stream overlay editor.

## Transparency

The base project was done using Claude. We're just 2 dudes and ain't got no time to write full documentation project with the limited free time we have. :cute_smile_cat_meme:

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown) with [remark-gfm](https://github.com/remarkjs/remark-gfm)
- Geist & Geist Mono fonts (self-hosted via the [`geist`](https://www.npmjs.com/package/geist) package)

## Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Adding or Editing Content

Documentation content lives in [`src/docs/`](src/docs/) as plain Markdown files — one file per section.

| File                    | Section            |
| ----------------------- | ------------------ |
| `getting-started.md`    | Getting Started    |
| `elements.md`           | Elements           |
| `layouts.md`            | Layouts            |
| `collaboration.md`      | Collaboration      |
| `permissions.md`        | Permissions        |
| `canvas-editing.md`     | Canvas & Editing   |
| `settings.md`           | Settings           |
| `assets.md`             | Assets             |
| `widget-development.md` | Widget Development |
| `glossary.md`           | Glossary           |

### Supported Markdown

Standard Markdown plus GitHub Flavored Markdown (tables, strikethrough, etc.) and GitHub-style alert callouts:

```markdown
> [!NOTE]
> Informational callout.

> [!TIP]
> Helpful tip.

> [!WARNING]
> Warning callout. Supports a custom title: > [!WARNING] Advanced
```

### Adding a New Section

1. Create a new `.md` file in `src/docs/`
2. Add the import and entry to `SECTIONS` in [`src/pages/Docs.tsx`](src/pages/Docs.tsx)
3. Add a nav item to `NAV_GROUPS` in [`src/components/DocsSidebar.tsx`](src/components/DocsSidebar.tsx)

## Theming

The app ships with 7 themes matching the main Pogly editor: **Dark**, **Light**, **Paper**, **Nord**, **Mocha**, **Solarized**, and **Matcha**. Theme CSS variables are defined in [`src/index.css`](src/index.css). The selected theme is persisted to `localStorage`.

## Build

```bash
npm run build
```

Output goes to `dist/`.
