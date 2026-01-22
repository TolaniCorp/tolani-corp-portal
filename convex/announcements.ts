import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get active announcements
export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const announcements = await ctx.db
      .query("announcements")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();

    // Filter out expired announcements
    return announcements.filter(
      (a) => !a.expiresAt || a.expiresAt > now
    );
  },
});

// Create announcement (admin only)
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("announcements", {
      ...args,
      createdBy: user._id,
      createdAt: Date.now(),
      isActive: true,
    });
  },
});
