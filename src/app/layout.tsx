import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BotherMe.co \u2014 Daily texts that make you a better person",
  description:
    "No app. No willpower. Just daily text messages that track your habits, guilt-trip your laziness, and celebrate your wins. Starting at $2/month.",
  keywords: [
    "habit tracking",
    "SMS habits",
    "text message reminders",
    "micro-habits",
    "accountability",
    "daily reminders",
    "habit tracker no app",
  ],
  authors: [{ name: "BotherMe.co" }],
  openGraph: {
    title: "BotherMe.co \u2014 Daily texts that make you a better person",
    description:
      "No app. No willpower. Just daily text messages that track your habits, guilt-trip your laziness, and celebrate your wins. Starting at $2/month.",
    url: "https://botherme.co",
    siteName: "BotherMe.co",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BotherMe.co \u2014 We\u2019ll nag you into being better",
    description:
      "SMS-first micro-habits. No app. No willpower. Just texts that won\u2019t leave you alone until you do the thing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BotherMe.co",
    url: "https://botherme.co",
    description:
      "SMS-first micro-habit tracking service. Daily text messages that help you build better habits.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@botherme.co",
      contactType: "customer service",
    },
    sameAs: [
      "https://twitter.com/bothermeco",
      "https://instagram.com/bothermeco",
      "https://tiktok.com/@bothermeco",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#6366F1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
