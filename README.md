# SNEAKR Landing Page

A modern React + Vite demo landing page for a premium Nike-style sneaker shop. This is a mock project and does not use official Nike logos, branding, or copyrighted product assets.

## About This Page

SNEAKR is designed as a high-end sportswear ecommerce landing page. It presents a polished sneaker shopping experience with a dark premium theme, animated hero shoe carousel, featured product cards, category showcases, promotional sale banner, benefits section, testimonials, newsletter signup, and footer content.

The product names, prices, categories, images, ratings, discounts, and descriptions are mock data and are easy to update from the files in `src/data`.

## Tools Used

- React
- TypeScript
- Vite
- Framer Motion
- Modern CSS
- Responsive layout techniques
- ESLint

## Features

- Sticky responsive navigation with mobile menu
- Animated hero section with transitioning sneaker visuals
- Elegant changing rating overlay for each hero shoe
- Scroll-reactive animated background lights
- Data-driven featured products
- Responsive product grid for mobile, tablet, and desktop
- Category, promo, benefits, testimonials, and newsletter sections
- Accessible semantic HTML and reduced-motion support

## Project Structure

```txt
src/
  components/
    layout/
    sections/
    ui/
  data/
  pages/
  styles/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Deploying to Vercel

This project is configured for Vercel with `vercel.json`.

Use these settings when importing the repository:

- Framework preset: `Vite`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: `20.19.0` or newer

Vercel will serve the built static files from `dist` and rewrite all routes to `index.html`, which keeps the React app working on direct URL visits.
