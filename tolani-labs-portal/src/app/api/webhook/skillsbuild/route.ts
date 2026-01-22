/**
 * Next.js API Route: IBM SkillsBuild Webhook Handler
 * 
 * Receives course completion events from IBM SkillsBuild and mints uTUT rewards.
 * 
 * Endpoint: POST /api/webhook/skillsbuild
 * 
 * Expected payload:
 * {
 *   "event": "course_completed",
 *   "user": { "wallet": "0x...", "email": "user@example.com" },
 *   "course": { "id": "ai-fundamentals", "name": "AI Fundamentals" },
 *   "timestamp": "2026-01-22T12:00:00Z",
 *   "certificate": "https://..." // optional
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, createWalletClient, http, parseAbi, keccak256, encodePacked } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

// Contract addresses (Base Mainnet)
const TRAINING_REWARDS = "0x24D8bE6650DBb2e4F15FcCE540b1f417A48B3526" as const;

const TRAINING_REWARDS_ABI = parseAbi([
  "function grantReward(address learner, bytes32 campaignId, bytes32 completionProof) external",
  "function campaigns(bytes32) view returns (string name, uint256 rewardPerCompletion, uint256 budget, uint256 spent, uint256 startTime, uint256 endTime, bool active)",
]);

// Campaign IDs (keccak256 hashes)
const CAMPAIGNS = {
  // General courses - 50 uTUT
  "general": "0x7d5cdddb86bdc460f01c202fe957700c31670ac987c0da99963486c0162644eb",
  "professional-skills": "0x7d5cdddb86bdc460f01c202fe957700c31670ac987c0da99963486c0162644eb",
  "workplace-skills": "0x7d5cdddb86bdc460f01c202fe957700c31670ac987c0da99963486c0162644eb",
  
  // AI & Data Science - 100 uTUT
  "ai-fundamentals": "0x082d7acd839ba88ceb6e05e3c3378d85a8a4338916f97c26802e4ad2e914cb85",
  "data-science": "0x082d7acd839ba88ceb6e05e3c3378d85a8a4338916f97c26802e4ad2e914cb85",
  "machine-learning": "0x082d7acd839ba88ceb6e05e3c3378d85a8a4338916f97c26802e4ad2e914cb85",
  "watson": "0x082d7acd839ba88ceb6e05e3c3378d85a8a4338916f97c26802e4ad2e914cb85",
  
  // Cybersecurity - 75 uTUT
  "cybersecurity": "0x43244ccd99b75b50c6b61d76f6f9c0b1b320f2f0331fde4374cc99f577145dda",
  "security-analyst": "0x43244ccd99b75b50c6b61d76f6f9c0b1b320f2f0331fde4374cc99f577145dda",
  "threat-intelligence": "0x43244ccd99b75b50c6b61d76f6f9c0b1b320f2f0331fde4374cc99f577145dda",
} as const;

// Default to general campaign for unknown courses
const DEFAULT_CAMPAIGN = CAMPAIGNS["general"];

export const runtime = "edge";

/**
 * Validate webhook signature (optional - implement based on IBM SkillsBuild docs)
 */
function validateSignature(request: NextRequest, body: string): boolean {
  const signature = request.headers.get("x-skillsbuild-signature");
  if (!signature) return true; // Skip validation if no signature header
  
  // TODO: Implement HMAC validation when IBM provides webhook secret
  // const secret = process.env.SKILLSBUILD_WEBHOOK_SECRET;
  // const expectedSig = createHmac('sha256', secret).update(body).digest('hex');
  // return signature === expectedSig;
  
  return true;
}

/**
 * Rate limiting using Upstash Redis (optional)
 */
async function checkRateLimit(wallet: string): Promise<boolean> {
  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;
  
  if (!redisUrl || !redisToken) return true; // Skip if not configured
  
  try {
    const key = `skillsbuild:ratelimit:${wallet}`;
    const response = await fetch(`${redisUrl}/incr/${key}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const data = await response.json();
    const count = data.result as number;
    
    // Set expiry on first request (24 hour window)
    if (count === 1) {
      await fetch(`${redisUrl}/expire/${key}/86400`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
    }
    
    // Allow max 10 completions per day per wallet
    return count <= 10;
  } catch {
    return true; // Allow on Redis errors
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const bodyText = await request.text();
    
    // Validate signature
    if (!validateSignature(request, bodyText)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
    
    const body = JSON.parse(bodyText);
    const { event, user, course, timestamp, certificate } = body;

    // Ignore non-completion events
    if (event !== "course_completed") {
      return NextResponse.json({ 
        success: true, 
        message: "Event ignored",
        event 
      });
    }

    // Validate wallet address
    if (!user?.wallet || !/^0x[a-fA-F0-9]{40}$/.test(user.wallet)) {
      return NextResponse.json(
        { error: "Invalid or missing wallet address" },
        { status: 400 }
      );
    }

    const learnerWallet = user.wallet as `0x${string}`;

    // Rate limiting
    const withinLimit = await checkRateLimit(learnerWallet);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Max 10 completions per day." },
        { status: 429 }
      );
    }

    // Map course to campaign
    const courseId = course?.id?.toLowerCase() || "general";
    const campaignId = (CAMPAIGNS[courseId as keyof typeof CAMPAIGNS] || DEFAULT_CAMPAIGN) as `0x${string}`;

    // Initialize clients
    const rpcUrl = process.env.NEXT_PUBLIC_BASE_RPC || process.env.BASE_RPC_URL || "https://mainnet.base.org";
    const publicClient = createPublicClient({
      chain: base,
      transport: http(rpcUrl),
    });

    // Check campaign is active
    try {
      const campaign = await publicClient.readContract({
        address: TRAINING_REWARDS,
        abi: TRAINING_REWARDS_ABI,
        functionName: "campaigns",
        args: [campaignId],
      });
      
      if (!campaign[6]) { // active flag
        return NextResponse.json(
          { error: "Campaign is not active", campaignId },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error("Failed to check campaign:", e);
    }

    // Initialize relayer wallet
    const privateKey = process.env.RELAYER_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json(
        { error: "Relayer not configured" },
        { status: 503 }
      );
    }

    const account = privateKeyToAccount(
      (privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`) as `0x${string}`
    );
    
    const walletClient = createWalletClient({
      account,
      chain: base,
      transport: http(rpcUrl),
    });

    // Generate completion proof (hash of learner + campaign + timestamp + certificate)
    const proofData = encodePacked(
      ["address", "bytes32", "uint256", "string"],
      [
        learnerWallet,
        campaignId,
        BigInt(timestamp ? new Date(timestamp).getTime() : Date.now()),
        certificate || ""
      ]
    );
    const completionProof = keccak256(proofData);

    // Submit transaction
    const hash = await walletClient.writeContract({
      address: TRAINING_REWARDS,
      abi: TRAINING_REWARDS_ABI,
      functionName: "grantReward",
      args: [learnerWallet, campaignId, completionProof],
    });

    // Wait for confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations: 1,
    });

    const processingTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Reward granted successfully",
      data: {
        learner: learnerWallet,
        course: courseId,
        campaignId,
        transactionHash: hash,
        blockNumber: receipt.blockNumber.toString(),
        processingTimeMs: processingTime,
      }
    });

  } catch (error: any) {
    console.error("Webhook error:", error);
    
    // Handle specific errors
    if (error.message?.includes("AlreadyCompleted")) {
      return NextResponse.json({
        success: false,
        error: "User already completed this campaign",
        code: "ALREADY_COMPLETED"
      }, { status: 409 });
    }
    
    if (error.message?.includes("BudgetExhausted")) {
      return NextResponse.json({
        success: false,
        error: "Campaign budget exhausted",
        code: "BUDGET_EXHAUSTED"
      }, { status: 503 });
    }

    if (error.message?.includes("insufficient funds")) {
      return NextResponse.json({
        success: false,
        error: "Relayer has insufficient gas",
        code: "INSUFFICIENT_GAS"
      }, { status: 503 });
    }

    return NextResponse.json(
      { 
        success: false,
        error: "Processing failed", 
        message: error.message,
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    endpoint: "/api/webhook/skillsbuild",
    version: "2.0.0",
    contract: TRAINING_REWARDS,
    campaigns: Object.keys(CAMPAIGNS).length,
  });
}
