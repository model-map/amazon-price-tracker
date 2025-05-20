# Amazon Price Tracker

An Amazon price tracker built using **Next.js**, **TailwindCSS**, **ShadCN components**, **NextAuth/Auth.js**, **Smartproxy**, and **PostgreSQL** with **Prisma** for database management.

---

## Features

- Track Amazon product prices over time.
- Authenticate users with **NextAuth/Auth.js**.
- Fetch product data using **Smartproxy** for web scraping.
- Store and manage data in a **PostgreSQL** database using **Prisma ORM**.
- Built with modern tools like **TailwindCSS** and **ShadCN components** for a sleek UI.

---

## Table of Contents

1. [Getting Started](#getting-started)
   - [Setting Up ShadCN and Next.js](#setting-up-shadcn-and-nextjs)
   - [Setting Up Prisma with PostgreSQL](#setting-up-prisma-with-postgresql)
   - [Setting Up Auth.js](#setting-up-authjs)
   - [Setting Up Google OAuth](#setting-up-google-oauth)
   - [Adding dynamic rendering based on session]
2. [Project Structure](#project-structure)
3. [Environment Variables](#environment-variables)
4. [Contributing](#contributing)
5. [License](#license)

---

## Getting Started

### Setting Up ShadCN and Next.js

To set up a new Next.js project with **ShadCN** configured, run the following command:

```bash
pnpm dlx shadcn@latest init
```

This will scaffold a Next.js project with ShadCN components pre-configured.

---

### Setting Up Prisma with PostgreSQL

We use **Neon.tech** to host a free **PostgreSQL** database. Follow these steps to set up Prisma:

1. **Install Prisma**:
   Install Prisma as a dependency in your project:

   ```bash
   pnpm i prisma
   ```

2. **Set Up Environment Variables**:
   Add your PostgreSQL database URL to the `.env` file:

   ```env
   DATABASE_URL="your_postgresql_url_here"
   ```

3. **Define the Product Model**:
   Update the `schema.prisma` file to include the `Product` model:

   ```prisma
   model Product {
       id          Int       @id @default(autoincrement())
       title       String
       img         String
       createdAt   DateTime  @default(now())
       updatedAt   DateTime  @updatedAt
   }
   ```

4. **Generate Prisma Client**:
   Run the following command to generate the Prisma client:

   ```bash
   pnpm dlx prisma generate
   ```

5. **Run Database Migrations**:
   Add the following script to the `scripts` section of your `package.json` for easy database migrations:

   ```json
   "db:migrate": "pnpm dlx prisma migrate dev --name init"
   ```

   Then run:

   ```bash
   pnpm db:migrate
   ```

6. **Add `.gitignore` Entry**:
   Ensure the `generate/prisma` directory is ignored by Git by adding it to your `.gitignore` file:

   ```
   generate/prisma
   ```

---

### Setting Up Auth.js

Follow these steps to integrate **Auth.js** into your project:

1. **Install Auth.js**:
   Install the `next-auth` package:

   ```bash
   pnpm add next-auth@beta
   ```

2. **Generate a Secret Key**:
   Generate a secret key for session encryption:

   ```bash
   pnpm dlx auth secret
   ```

3. **Create `auth.ts`**:
   Create an `auth.ts` file in the root directory with the following content:

   ```ts
   import NextAuth from "next-auth";

   export const { handlers, signIn, signOut, auth } = NextAuth({
     providers: [],
   });
   ```

4. **Create `route.ts`**:
   Create a `route.ts` file in `/api/auth/[...nextauth]/route.ts` with the following content:

   ```ts
   import { handlers } from "@/auth"; // Referring to the auth.ts we just created
   export const { GET, POST } = handlers;
   ```

5. **Optional Middleware**:
   To keep the session alive, add the following middleware in the root folder `/middleware.ts`:

   ```ts
   export { auth as middleware } from "@/auth";
   ```

---

### Setting Up Google OAuth

#### Reference

[Auth.js OAuth Documentation](https://authjs.dev/getting-started/authentication/oauth)

#### Steps:

1. **Google Cloud Console**:

   - Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
   - Search for **OAuth Credentials**.
   - Create credentials and select **OAuth Client ID**.
   - Choose **Web Application** as the application type.

2. **Authorized Redirect URIs**:

   - Add the following URI to the **Authorized redirect URIs** section:
     ```
     [origin]/api/auth/callback/google
     ```
     Replace `[origin]` with:
     - `http://localhost:3000` during development.
     - Your deployed application URL in production.

3. **Environment Variables**:

   - Add the generated `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` to your `.env.local` file:
     ```env
     AUTH_GOOGLE_ID="your_google_oauth_id"
     AUTH_GOOGLE_SECRET="your_google_oauth_secret"
     ```

4. **Set Up Provider**:

   - Update `auth.ts` with the following code:

     ```ts
     import NextAuth from "next-auth";
     import Google from "next-auth/providers/google";

     export const { handlers, signIn, signOut, auth } = NextAuth({
       providers: [Google],
     });
     ```

   - In `/api/auth/[...nextauth]/route.ts`, add the handlers so Auth.js can handle incoming requests:

     ```ts
     import { handlers } from "@/auth";
     export const { GET, POST } = handlers;
     ```

5. **Add Login Action**:

   - Add the following `action` to your form element to enable Google login:

     ```tsx
     action={async () => {
       "use server";
       await signIn("google");
     }}
     ```

### Setting Dynamic rendering based on session

- session object can be accessed via the async `auth()` function provided by `@/auth`

```
import {auth} from "@/auth";
const session = await auth();
```

## It's generally a good practice to

## Project Structure

```
├── app/                  # Next.js app directory (pages, layouts, etc.)
├── components/           # Reusable UI components
├── lib/                  # Utility functions and helpers
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets (images, fonts, etc.)
├── styles/               # Global CSS or Tailwind configuration
├── .env                  # Environment variables
├── next.config.js        # Next.js configuration
├── README.md             # Project documentation
└── package.json          # Dependencies and scripts
```

---

## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```env
DATABASE_URL="your_postgresql_url_here"  # PostgreSQL database URL from Neon.tech
NEXTAUTH_SECRET="your_nextauth_secret"   # Secret for NextAuth session encryption
SMARTPROXY_API_KEY="your_smartproxy_key" # API key for Smartproxy
AUTH_GOOGLE_ID="your_google_oauth_id"    # Google OAuth Client ID
AUTH_GOOGLE_SECRET="your_google_oauth_secret" # Google OAuth Client Secret
```

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
