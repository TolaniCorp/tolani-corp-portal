import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClerkProvider } from "@/components/providers/ConvexClerkProvider";

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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ConvexClerkProvider>
          {children}
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
