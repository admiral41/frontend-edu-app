# Frontend Edu App

A modern educational application built with Next.js 16.0.6, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Next.js 16.0.6** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **JavaScript (ES6+)** - Programming language

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

1. Clone the repository (if applicable)
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the values as needed

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
frontend-edu-app/
├── app/                  # Next.js app directory
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.js        # Root layout
│   └── page.js          # Home page
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions
│   └── utils.js        # cn() utility for class merging
├── public/             # Static assets
├── .env.local          # Environment variables (local)
├── .env.example        # Environment variables template
├── components.json     # shadcn/ui configuration
├── jsconfig.json       # JavaScript configuration
├── next.config.js      # Next.js configuration
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Adding shadcn/ui Components

You can add shadcn/ui components using the CLI:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# ... etc
```

Components will be added to the `components/ui` directory.

## Environment Variables

See `.env.example` for available environment variables.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
