import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tolani Labs | Learn. Earn. Build.",
  description: "The education and training hub of the Tolani Ecosystem DAO. Master blockchain, AI, and cybersecurity with IBM SkillsBuild. Earn uTUT tokens for every milestone.",
  keywords: ["tolani", "labs", "blockchain", "training", "ibm skillsbuild", "web3", "dao", "uTUT", "TUT", "learn to earn"],
  authors: [{ name: "Tolani Labs" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Tolani Labs | Learn. Earn. Build.",
    description: "Master blockchain, AI, and cybersecurity with world-class curriculum. Earn uTUT tokens for every milestone.",
    type: "website",
    url: "https://tolanilabs.io",
    siteName: "Tolani Labs",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Tolani Labs - Learn. Earn. Build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tolani Labs | Learn. Earn. Build.",
    description: "Master blockchain, AI, and cybersecurity with world-class curriculum. Earn uTUT tokens for every milestone.",
    images: ["/og-image.svg"],
  },
  metadataBase: new URL("https://tolanilabs.io"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
