"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Only create Convex client if URL is available
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  // If Convex is not configured, continue rendering app content without Convex.
  if (!convex) {
    return <>{children}</>;
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
