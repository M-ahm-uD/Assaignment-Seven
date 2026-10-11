# Bazar-Dor

Bazar-Dor is a web application built with Next.js that helps users explore daily market prices, browse product categories, and view product information.

## Features

- Browse product categories.
- Explore products and their prices.
- Sort products by price from low to high or high to low.
- View product details.
- Responsive design for different screen sizes.
- Loading and empty states for a better user experience.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed on your computer.

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd bazar-dor
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
src/
└── app/
    ├── categories/
    │   ├── page.tsx
    │   └── [slug]/
    │       └── page.tsx
    ├── page.tsx
    ├── layout.tsx
    └── globals.css
```

## Deployment

This project can be deployed using [Vercel](https://vercel.com/).

## Links

- **GitHub Repository:** YOUR_GITHUB_REPOSITORY_URL
- **Live Demo:** YOUR_VERCEL_DEPLOYMENT_URL
