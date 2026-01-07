import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tolani Corp | Building Beyond Boundaries",
  description: "At Tolani Corp, we don't just build businesses—we build legacies. Rooted in innovation, transparency, and integrity across diverse industries worldwide.",
  keywords: ["conglomerate", "innovation", "blockchain", "construction", "philanthropy", "global business"],
  authors: [{ name: "Tolani Corp" }],
  openGraph: {
    title: "Tolani Corp | Building Beyond Boundaries",
    description: "At Tolani Corp, we don't just build businesses—we build legacies.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/assets/foundation/favicon-lockup-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/foundation/favicon-lockup-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/foundation/favicon-lockup-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [
      { url: "/assets/foundation/favicon-lockup.png", type: "image/png" },
    ],
    apple: [
      { url: "/assets/foundation/favicon-lockup-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/foundation/favicon-lockup.png" type="image/png" />
        <link rel="shortcut icon" href="/assets/foundation/favicon-lockup.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/foundation/favicon-lockup-180.png" />
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
