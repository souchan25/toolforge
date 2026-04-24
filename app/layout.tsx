import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBlobs } from "@/components/layout/BackgroundBlobs";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

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
    url: "https://toolforge.dev",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <BackgroundBlobs />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
