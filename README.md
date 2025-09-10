This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

# Email Tracer Frontend

Live Demo: https://email-tracer-frontend.vercel.app/](https://email-tracer-frontend.vercel.app/)

## Overview

LucidGrowth Frontend is a modern, responsive web application built with Next.js and Tailwind CSS. It serves as the user interface for the LucidGrowth platform, providing email dashboard functionality, custom subject checks, and a polished user experience.

## Features

- **Email Dashboard**: View recent emails, including full metadata, in a responsive table layout.
- **Custom Subject Check**: Input any subject to fetch and display all related emails stored in the backend database.
- **Send Email Form**: Test email sending and check status, with improved input field visibility and user feedback.
- **Responsive Design**: Optimized for desktop and mobile, with flex/grid layouts and scroll bar management.
- **Modern UI**: Uses Tailwind CSS for styling, with card components, center alignment, and clean visuals.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons/Assets**: SVGs in `public/`
- **API Integration**: Connects to LucidGrowth Backend (NestJS)

## Folder Structure

```
lucidgrowth-frontend/
├── public/           # SVG assets and icons
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── package.json      # Project dependencies
├── tsconfig.json     # TypeScript config
├── next.config.ts    # Next.js config
├── postcss.config.mjs
├── README.md         # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CodeForgeNet/lucidgrowth-frontend.git
   cd lucidgrowth-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file for environment variables (if needed):
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-api-url
   ```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub.
2. Import the repository into Vercel.
3. Set environment variables as needed.
4. Vercel will handle build and deployment automatically.

## Customization

- **Styling**: Modify `globals.css` or Tailwind classes in components for custom styles.
- **API Endpoints**: Update API URLs in service layer to match your backend.
- **Components**: Extend or modify `EmailDashboard` and `SendEmailForm` for new features.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Contact

For questions or support, contact [CodeForgeNet](mailto:support@codeforgenet.com).

---

**LucidGrowth Frontend** — Modern email dashboard and subject-based search, powered by Next.js and Tailwind CSS.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
