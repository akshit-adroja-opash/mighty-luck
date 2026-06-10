# Project Folder Structure

This file provides an overview of the current directory and file structure of the `mighty-luck` Next.js application.

```text
mighty-luck/
├── .next/                  # Next.js build output
├── node_modules/           # Node.js dependencies
├── public/                 # Static assets (images, fonts, etc.)
├── src/                    # Application source code
│   ├── app/                # Next.js App Router root
│   │   ├── (auth)/         # Authentication routes group
│   │   │   └── login/      # Login page route
│   │   ├── account/        # User account route
│   │   ├── games/          # Games section routes
│   │   │   └── [id]/       # Dynamic game route
│   │   ├── favicon.ico
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page component
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Layout components (Header, Footer, etc.)
│   │   │   ├── Container.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── sections/       # Page-specific sections
│   │   └── ui/             # Reusable UI primitives
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       └── Typography.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and library wrappers
│   ├── store/              # Redux Toolkit setup
│   │   ├── slices/         # Redux state slices
│   │   │   ├── authSlice.ts
│   │   │   ├── gameSlice.ts
│   │   │   └── uiSlice.ts
│   │   ├── hooks.ts        # Typed Redux hooks
│   │   └── index.ts        # Store configuration
│   ├── styles/             # Global CSS and Tailwind directives
│   │   └── globals.css
│   └── types/              # TypeScript type definitions
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
