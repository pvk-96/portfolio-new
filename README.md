# Modernized Portfolio - Praneeth Varma K

Welcome to the Next.js rewrite of your portfolio! This project was seamlessly migrated from a single HTML file into a scalable, modern React architecture utilizing Next.js (App Router), Tailwind CSS v4, Framer Motion, and React Three Fiber.

## Quick Setup

To run the project locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Visit the Site**
   Open [http://localhost:3000](http://localhost:3000)

## Features Included

- **Exact Visual Identity**: The font styling (Bebas Neue, DM Sans, Cormorant Garamond, JetBrains Mono), `var(--color-cyan)` themes, and the exact dark premium layout were mapped 1-to-1.
- **Framer Motion Reveals**: Replaced generic CSS reveals with spring-driven `motion.div` intersections. Elements now enter cohesively.
- **Upgraded Hero**: The standard 2D canvas infinity curve was reimagined using `@react-three/fiber` as a `<TorusKnot>` infinity mesh layered with interactive pointer lights and dynamic `<Stars />`.
- **Integrated Full CMS (`/admin`)**: 
   - A fully replicated Admin UI built locally using React State.
   - All text logic binds dynamically to a flexible JSON API.
   - **Default Login**: Username `admin` / Password `admin` (change these in Admin -> Settings).

## Project Structure

- `src/app/page.tsx` — Main global portfolio assembly.
- `src/app/admin/page.tsx` — Protected CMS Dashboard.
- `src/components/*` — The core building blocks for each section (Hero, Experience, Projects).
- `src/data/cms.json` — Acting native database. This handles rapid read/write data mapping without needing external PostgreSQL setups explicitly unless desired later.
- `src/app/api/content` — Route handlers mediating file saves securely.
