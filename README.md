# Firebase Studio

This repository contains a starter project built with Next.js and Firebase.

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

Create a `.env.local` file at the project root and add your Firebase API keys:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

These values are required for the app to connect to Firestore and Auth.

### Firestore

User progress is stored in Firestore at `users/{uid}/progress`. Configure your
Firebase credentials in `.env.local` using the variables
`NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` and
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`.

## Building

Generate a production build with:

```bash
npm run build
```

Start the compiled app using:

```bash
npm start
```

## Firebase Hosting

Authenticate with Firebase:

```bash
firebase login
```

Deploy the production build:

```bash
firebase deploy
```

This command uses [`apphosting.yaml`](apphosting.yaml) to configure scaling. If
you prefer to run the server manually, build and start with:

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
