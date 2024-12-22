# Apple Watch Studio Clone

A web application that lets you customize and preview Apple Watch combinations, built with Next.js.

## Quick Start

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

## Features

- Watch customization interface
- Real-time preview
- Multiple watch sizes and styles
- Band and case selection
- Image download option
- Mobile responsive

## Project Structure
```
watch-studio/
├── app/                   # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/                # UI components
│   └── watch/             # Watch-specific components
├── lib/                   # Utility functions & constants
│   └── data/              # Static data & types
└── public/                # Static assets
    ├── cases/             # Watch case images
    └── bands/             # Watch band images
```
