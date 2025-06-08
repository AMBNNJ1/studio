# ICT Academy Lite

This repository contains a starter project built with Next.js and Supabase.

## Requirements

- Node.js 18+
- npm

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The main entry point is `src/app/page.tsx`.

### Environment Setup

Create a `.env.local` file at the project root and add your Supabase API keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These values are required for the app to connect to your Supabase project.

### Supabase Database

User progress is stored in the Supabase `progress` table. Configure your
Supabase credentials in `.env.local` using the variables
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

To upload the module and lesson content to your database, run:

```bash
npm run seed
```

## Building

Generate a production build with:

```bash
npm run build
```

Start the compiled app using:

```bash
npm start
```

## Deployment

Deploy the production build anywhere that can run Node.js. Provide your Supabase
environment variables in the host's configuration and run:

```bash
npm run build
npm start
```

## Checks

Verify TypeScript types:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Run unit tests with Jest:

```bash
npm test
```

The Jest setup uses the React Testing Library and a jsdom environment.

## Docs

See [`docs/blueprint.md`](docs/blueprint.md) for a high-level design overview.
