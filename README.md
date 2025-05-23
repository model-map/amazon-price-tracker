# Amazon Price Tracker

A modern Amazon price tracking tool built with **Next.js**, **TailwindCSS**, **ShadCN**, **Auth.js**, **Smartproxy**, and **PostgreSQL** (via **Prisma**).

---

## Features

- Monitor price changes of Amazon products.
- User authentication using **Auth.js** (NextAuth).
- Web scraping powered by **Oxylabs API**.
- Data persistence using **PostgreSQL** with **Prisma ORM**.
- Clean, modern UI built with **TailwindCSS** and **ShadCN components**.

---

## Table of Contents

1. [Getting Started](#getting-started)

   - [Winston Logger Setup](#winston-logger-setup)
   - [ShadCN & Next.js Setup](#shadcn--nextjs-setup)
   - [Prisma with PostgreSQL](#prisma-with-postgresql)
   - [Auth.js Integration](#authjs-integration)
   - [Google OAuth Setup](#google-oauth-setup)
   - [Session-Based Rendering](#session-based-rendering)
   - [Adding Products & Actions](#adding-products--actions)

2. [Project Structure](#project-structure)
3. [Environment Variables](#environment-variables)
4. [Contributing](#contributing)
5. [License](#license)

---

## Getting Started

### Winston Logger Setup

1. Install dependencies:

   ```bash
   pnpm i winston winston-daily-rotate-file
   ```

2. Create `libs/logger.ts` and add the following:

   ```ts
   import { createLogger, format, transports } from "winston";
   import "winston-daily-rotate-file";

   const getLogger = (fileName = "application") => {
     const isProduction = process.env.NODE_ENV === "production";

     const fileLogTransport = new transports.DailyRotateFile({
       filename: `logs/${fileName}-%DATE%.log`,
       datePattern: "YYYY-MM-DD",
       zippedArchive: true,
       maxSize: "20m",
       maxFiles: "30d",
       level: process.env.LOG_LEVEL || "info",
       handleExceptions: true,
       handleRejections: true,
     });

     const consoleTransport = new transports.Console({
       level: process.env.LOG_LEVEL || "info",
       handleExceptions: true,
       handleRejections: true,
       format: format.combine(
         format.colorize(),
         format.printf(({ level, message }) => `${level}: ${message}`)
       ),
     });

     const logger = createLogger({
       level: process.env.LOG_LEVEL || "info",
       format: format.combine(
         format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
         format.errors({ stack: true }),
         format.splat(),
         format.printf(
           ({ level, message, label = process.env.NODE_ENV, timestamp }) =>
             `${timestamp} [${label}] ${level}: ${message}`
         )
       ),
       defaultMeta: { service: "Amazon-Price-Tracker" },
       transports: [
         consoleTransport,
         ...(isProduction ? [fileLogTransport] : []),
       ],
       exitOnError: false,
     });

     return logger;
   };

   export { getLogger };
   ```

---

### ShadCN & Next.js Setup

```bash
pnpm dlx shadcn@latest init
```

This sets up a Next.js project with ShadCN components preconfigured.

---

### Prisma with PostgreSQL

1. Install Prisma:

   ```bash
   pnpm i prisma
   ```

2. Add `.env` with your DB connection:

   ```env
   DATABASE_URL="your_postgresql_url_here"
   ```

3. Define schema (`schema.prisma`):

   ```prisma
   model Product {
     id        Int      @id @default(autoincrement())
     title     String
     img       String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

4. Generate client:

   ```bash
   pnpm dlx prisma generate
   ```

5. Add migration script to `package.json`:

   ```json
   "db:migrate": "pnpm dlx prisma migrate dev --name init"
   ```

   Then run:

   ```bash
   pnpm db:migrate
   ```

6. Add to `.gitignore`:

   ```
   generate/prisma
   ```

---

### Auth.js Integration

1. Install:

   ```bash
   pnpm add next-auth@beta
   ```

2. Generate secret:

   ```bash
   pnpm dlx auth secret
   ```

3. Create `auth.ts`:

   ```ts
   import NextAuth from "next-auth";
   export const { handlers, signIn, signOut, auth } = NextAuth({
     providers: [],
   });
   ```

4. Create `api/auth/[...nextauth]/route.ts`:

   ```ts
   import { handlers } from "@/auth";
   export const { GET, POST } = handlers;
   ```

5. Optional middleware:

   ```ts
   export { auth as middleware } from "@/auth";
   ```

---

### Google OAuth Setup

1. In [Google Cloud Console](https://console.cloud.google.com/), create OAuth credentials.

2. Add redirect URI:

   ```
   http://localhost:3000/api/auth/callback/google
   ```

3. Add to `.env.local`:

   ```env
   AUTH_GOOGLE_ID="your_google_oauth_id"
   AUTH_GOOGLE_SECRET="your_google_oauth_secret"
   ```

4. Update `auth.ts`:

   ```ts
   import Google from "next-auth/providers/google";

   export const { handlers, signIn, signOut, auth } = NextAuth({
     providers: [Google],
   });
   ```

5. Enable login in forms:

   ```tsx
   action={async () => {
     "use server";
     await signIn("google");
   }}
   ```

---

### Session-Based Rendering

Use the `auth()` helper:

```ts
import { auth } from "@/auth";
const session = await auth();
```

Render UI based on session state.

---

### Adding Products & Actions

1. Create `action/productActions.ts`.

2. Attach form actions like:

   ```tsx
   action={async () => {
     "use server";
     // Add product logic
   }}
   ```

---

## Project Structure

```
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
├── .env
├── next.config.js
├── README.md
└── package.json
```

---

## Environment Variables

```env
DATABASE_URL="your_postgresql_url_here"
NEXTAUTH_SECRET="your_nextauth_secret"
SMARTPROXY_API_KEY="your_smartproxy_key"
AUTH_GOOGLE_ID="your_google_oauth_id"
AUTH_GOOGLE_SECRET="your_google_oauth_secret"
```

---

## Contributing

1. Fork and clone the repo.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit: `git commit -m "Add feature"`.
4. Push: `git push origin feature/my-feature`.
5. Open a pull request.

---

## License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
