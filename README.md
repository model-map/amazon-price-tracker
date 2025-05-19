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

5. **Add `db:migrate` Script to `package.json`**:
   Add the following script to the `scripts` section of your `package.json` for easy database migrations whenever you make changes to your `schema.prisma` file:

   ```json
   "db:migrate": "pnpm dlx prisma migrate dev --name init"
   ```

6. **Add `.gitignore` Entry**:
   Ensure the `generate/prisma` directory is ignored by Git by adding it to your `.gitignore` file:
   ```
   generate/prisma
   ```

---

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
