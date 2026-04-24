"use client";
// components/layout/ThemeProvider.tsx
// Minimal wrapper — dark mode only for now, no next-themes needed
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
