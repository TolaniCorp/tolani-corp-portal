import { fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";

export type AnnouncementPriority = "low" | "medium" | "high";

export type LiveAnnouncement = {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  createdAt: number;
  source: "convex" | "fallback";
};

const fallbackAnnouncements: Omit<LiveAnnouncement, "id" | "createdAt" | "source">[] = [
  {
    title: "Operations app is live",
    content:
      "The new operations workspace is now available with portfolio links and live announcements.",
    priority: "medium",
  },
  {
    title: "Portfolio surfaces updated",
    content:
      "Strategy, ecosystem, and platform views now share a common dynamic announcements channel.",
    priority: "low",
  },
  {
    title: "Contact workflow active",
    content:
      "Inbound contact requests continue routing through the API with delivery status visibility.",
    priority: "low",
  },
];

const priorityOrder: Record<AnnouncementPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function buildFallback(limit: number): LiveAnnouncement[] {
  const now = Date.now();

  return fallbackAnnouncements.slice(0, limit).map((announcement, index) => ({
    id: `fallback-${index}`,
    title: announcement.title,
    content: announcement.content,
    priority: announcement.priority,
    createdAt: now - index * 1000,
    source: "fallback",
  }));
}

export async function getLiveAnnouncements(limit = 3): Promise<LiveAnnouncement[]> {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return buildFallback(limit);
  }

  try {
    const announcements = await fetchQuery(api.announcements.getActive, {});

    if (!announcements.length) {
      return buildFallback(limit);
    }

    return announcements
      .map((announcement) => ({
        id: announcement._id,
        title: announcement.title,
        content: announcement.content,
        priority: announcement.priority,
        createdAt: announcement.createdAt,
        source: "convex" as const,
      }))
      .sort((a, b) => {
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) {
          return priorityDiff;
        }

        return b.createdAt - a.createdAt;
      })
      .slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch live announcements from Convex.", error);
    return buildFallback(limit);
  }
}
