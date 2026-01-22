"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Only create Convex client if URL is available
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  // If Clerk is not configured, render children without auth
  if (!clerkPubKey || !clerkPubKey.startsWith("pk_")) {
    return <>{children}</>;
  }

  // If Convex is not configured, render with Clerk only
  if (!convex) {
    return (
      <ClerkProvider
        publishableKey={clerkPubKey}
        appearance={{
          variables: {
            colorPrimary: "#1a1a2e",
            colorText: "#1a1a2e",
            colorTextOnPrimaryBackground: "#ffffff",
            colorBackground: "#ffffff",
            colorInputBackground: "#f8f9fa",
            colorInputText: "#1a1a2e",
            borderRadius: "0.5rem",
          },
          elements: {
            card: {
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(26, 26, 46, 0.1)",
            },
            formButtonPrimary: {
              background: "linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #2a2a4e 0%, #5a5a7a 100%)",
              },
            },
            socialButtonsBlockButton: {
              border: "1px solid rgba(26, 26, 46, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(26, 26, 46, 0.05)",
              },
            },
          },
        }}
      >
        {children}
      </ClerkProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        variables: {
          colorPrimary: "#1a1a2e",
          colorText: "#1a1a2e",
          colorTextOnPrimaryBackground: "#ffffff",
          colorBackground: "#ffffff",
          colorInputBackground: "#f8f9fa",
          colorInputText: "#1a1a2e",
          borderRadius: "0.5rem",
        },
        elements: {
          card: {
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(26, 26, 46, 0.1)",
          },
          formButtonPrimary: {
            background: "linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #2a2a4e 0%, #5a5a7a 100%)",
            },
          },
          socialButtonsBlockButton: {
            border: "1px solid rgba(26, 26, 46, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(26, 26, 46, 0.05)",
            },
          },
        },
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
