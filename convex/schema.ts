import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    role: v.optional(v.string()),
    department: v.optional(v.string()),
    employeeId: v.optional(v.string()),
    createdAt: v.number(),
    lastLoginAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  activityLogs: defineTable({
    userId: v.id("users"),
    action: v.string(),
    details: v.optional(v.string()),
    timestamp: v.number(),
    ipAddress: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    createdBy: v.id("users"),
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
    isActive: v.boolean(),
  }).index("by_active", ["isActive"]),

  timeOffRequests: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("vacation"), v.literal("sick"), v.literal("personal"), v.literal("other")),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("denied")),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    reviewedBy: v.optional(v.id("users")),
    reviewedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),
});
