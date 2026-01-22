import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";

// Validate Clerk JWT and return user info
export const validateSession = action({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }
    
    return {
      subject: identity.subject,
      email: identity.email,
      name: identity.name,
      pictureUrl: identity.pictureUrl,
    };
  },
});
