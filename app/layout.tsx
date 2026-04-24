import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ToolForge — Developer Tools, Forged to Perfection",
    template: "%s | ToolForge",
  },
  description:
    "ToolForge is a free suite of 21+ high-performance developer utilities: JSON formatter, Regex tester, Base64 encoder, CSS generator, color tools, and more. All run in your browser.",
  keywords: [
    "developer tools",
    "JSON formatter",
    "regex tester",
    "base64",
    "CSS generator",
    "color picker",
    "UUID generator",
    "hash generator",
    "developer utilities",
  ],
  openGraph: {
    type: "website",
    title: "ToolForge — Developer Tools, Forged to Perfection",
    description:
      "21+ free browser-based developer utilities. JSON, CSS, Color, Code — all in one place.",
    url: "https://devtoolforge.tech",
    siteName: "ToolForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolForge — Developer Tools",
    description: "21+ free browser-based developer utilities.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1594126384470330" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1594126384470330"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
