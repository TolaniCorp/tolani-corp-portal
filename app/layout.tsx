import type { Metadata } from "next";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConvexClerkProvider } from "@/components/providers/ConvexClerkProvider";
import { Shell } from "@/components/Shell";
import { hasClerkClientEnv } from "@/lib/clerk";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const extensionNoiseFilter = `
  (() => {
    const isExtensionNoise = (input, source) => {
      const text = String(input ?? "").toLowerCase();
      const src = String(source ?? "").toLowerCase();

      return (
        src.startsWith("chrome-extension://") ||
        src.includes("installhook.js") ||
        src.includes("inpage.js") ||
        src.includes("csspoofgeomain.bundle.js") ||
        src.includes("contentscript") ||
        text.includes("getofflinesigner") ||
        text.includes("keplr") ||
        text.includes("affirm extension") ||
        text.includes("spoofgeo") ||
        text.includes("verification timed out") ||
        text.includes("failed to connect to metamask") ||
        text.includes("metamask extension not found") ||
        text.includes("a listener indicated an asynchronous response by returning true") ||
        text.includes("message channel closed before a response was received")
      );
    };

    window.addEventListener(
      "error",
      (event) => {
        const message = event.message || event.error?.message;
        if (isExtensionNoise(message, event.filename)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true,
    );

    window.addEventListener(
      "unhandledrejection",
      (event) => {
        const reason = event.reason;
        const message = reason?.message ?? reason;
        if (isExtensionNoise(message, "")) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      },
      true,
    );
  })();
`;

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

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasClerk = hasClerkClientEnv();

  const appContent = (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-end gap-3 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <Show when="signed-out">
          <SignInButton mode="modal" fallbackRedirectUrl="/employee-portal/dashboard" />
          <SignUpButton mode="modal" fallbackRedirectUrl="/employee-portal/dashboard" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <ConvexClerkProvider>
        <Shell>
          {children}
        </Shell>
      </ConvexClerkProvider>
    </>
  );

  return (
    <html lang="en">
      <body className={inter.variable}>
        <Script id="extension-noise-filter" strategy="beforeInteractive">
          {extensionNoiseFilter}
        </Script>
        {hasClerk ? (
          <ClerkProvider publishableKey={clerkPubKey}>
            {appContent}
          </ClerkProvider>
        ) : (
          <Shell>
            {children}
          </Shell>
        )}
      </body>
    </html>
  );
}
