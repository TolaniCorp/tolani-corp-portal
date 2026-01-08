import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tccg.work"),
  title: {
    default: "TC Construction Group | Smart HVAC & ESG Solutions",
    template: "%s | TC Construction Group",
  },
  description:
    "TC Construction Group specializes in smart HVAC installations, ESG-compliant construction, and sustainable building solutions. Building Beyond with cutting-edge technology.",
  keywords: [
    "construction",
    "smart HVAC",
    "ESG construction",
    "sustainable building",
    "HVAC installation",
    "green building",
    "construction management",
    "Tolani Corp",
  ],
  authors: [{ name: "TC Construction Group" }],
  creator: "Tolani Corp",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tccg.work",
    siteName: "TC Construction Group",
    title: "TC Construction Group | Smart HVAC & ESG Solutions",
    description:
      "Specializing in smart HVAC installations, ESG-compliant construction, and sustainable building solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TC Construction Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TC Construction Group | Smart HVAC & ESG Solutions",
    description:
      "Specializing in smart HVAC installations, ESG-compliant construction, and sustainable building solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
