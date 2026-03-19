# BotherMe.co

**SMS-first micro-habit tracking.** Daily text messages that nag you into being a better person.

> High Function. Mild Chaos.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Fonts**: Inter (body) + Space Grotesk (display) via `next/font`
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/bothermeco.git
cd bothermeco

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|----------|-------------|
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number (e.g. +18558126669) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. https://botherme.co) |

## Project Structure

```
src/
  app/
    api/signup/route.ts    # POST endpoint for phone signups
    globals.css            # Tailwind + custom animations + dark mode
    layout.tsx             # Root layout with SEO, fonts, structured data
    not-found.tsx          # Custom 404 page
    page.tsx               # Home page (assembles all sections)
  components/
    AnimatedCounter.tsx    # Scroll-triggered number counter
    FadeIn.tsx             # Intersection Observer fade-in wrapper
    Navbar.tsx             # Sticky nav with dark mode toggle
    sections/
      Hero.tsx             # Hero with phone mockup + typing animation
      HowItWorks.tsx       # 3-step explainer
      ProductGrid.tsx      # Filterable product cards
      Pricing.tsx          # 3-tier pricing with annual toggle
      Testimonials.tsx     # Auto-scrolling carousel
      FAQ.tsx              # Accordion
      Footer.tsx           # CTA section + footer
public/
  sitemap.xml              # Sitemap for search engines
  robots.txt               # Crawler directives
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

The site is configured for one-click Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repo to Vercel for automatic deployments on push.

## Features

- Dark mode (system preference + manual toggle)
- Scroll-triggered fade-in animations
- Animated streak counter
- Phone mockup with simulated text conversation
- Filterable product grid
- Monthly/annual pricing toggle
- Auto-scrolling testimonial carousel
- Accordion FAQ
- Full SEO (meta tags, Open Graph, structured data, sitemap)
- Fully responsive (mobile, tablet, desktop)

## License

Proprietary. All rights reserved.
