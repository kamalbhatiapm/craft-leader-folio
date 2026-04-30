# Kamal Bhatia — Personal Site

A personal website and portfolio built by [Kamal Bhatia](https://calmfalcon.ai). It's a quiet corner of the internet that gathers the work, words, and moments I care about.

Live at **[calmfalcon.ai](https://calmfalcon.ai)**.

## What's inside

- **About** — who I am and what I'm currently focused on.
- **Projects** — selected things I've shipped or am building.
- **Articles** — writing on product, craft, and the occasional tangent.
- **Awards** — recognition from work along the way.
- **Through My Lens** — a photo gallery of moments beyond the roadmap, all shot by me.
- **Quotes & Songs** — small collections of lines and tracks that have stuck with me.

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** with **shadcn/ui** (Radix primitives)
- **React Router** for client-side routing
- **TanStack Query** for data fetching
- **Lovable Cloud** (Supabase under the hood) for backend capabilities
- **Vitest** + **Testing Library** for tests

## Local development

Requires Node.js 18+ and npm (or bun).

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# run tests
npm test
```

The dev server runs at `http://localhost:8080` by default.

## Project structure

```
src/
├── assets/        # images, including the lens gallery photos
├── components/    # shared components (nav, footer, ui primitives)
├── content/       # static content (articles, projects, awards, lens, etc.)
├── pages/         # top-level routes (Index, LensPage, NotFound)
├── sections/      # homepage sections (About, Projects, LensTeaser, …)
├── lib/           # hooks and utilities
└── integrations/  # backend client (auto-generated, do not edit)
```

## Editing content

Most of the site is content-driven. To update what shows up on the page, edit the files in `src/content/`:

- `profile.ts` — bio and intro copy
- `projects.ts` — featured projects
- `articles.ts` — writing
- `awards.ts` — awards & recognition
- `lens.ts` — photo gallery entries
- `quotes.ts`, `songs.ts` — quotes and songs

## Deployment

This project is built and deployed via [Lovable](https://lovable.dev). Pushing changes to the connected GitHub repo (or editing in Lovable) triggers a redeploy. The custom domain `calmfalcon.ai` is configured in the Lovable project settings.

## License

Personal project — all content and photographs © Kamal Bhatia.
