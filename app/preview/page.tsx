import type { Metadata } from "next";

import { TolaniSitePreview } from "@/components/TolaniSitePreview";
import {
  featuredPurchaseChannels,
  platformPlans,
  portfolioMetrics,
} from "@/lib/portfolioStrategy";
import {
  brandCommunicationProfiles,
  getPrimaryHqLine,
  hqIvrTree,
} from "@/lib/enterpriseCommunicationNetwork";

export const metadata: Metadata = {
  title: "Tolani Corp Preview | Production Workbench",
  description:
    "A device-framed production preview for Tolani Corp routes, service-worker state, purchase channels, and portfolio command surfaces.",
};

const previewRoutes = [
  {
    key: "home",
    label: "Command center",
    path: "/",
    owner: "Tolani Corp HQ",
    description:
      "The public parent-company surface for portfolio routing, purchase channels, brand visibility, and operator console access.",
    status: "live-now" as const,
  },
  {
    key: "communications",
    label: "Communications",
    path: "/communications",
    owner: "Enterprise network",
    description:
      "The HQ switchboard, IVR branches, voice routing, and channel policy view for cross-brand support.",
    status: "operator-led" as const,
  },
  {
    key: "strategy",
    label: "Strategy",
    path: "/strategy",
    owner: "Portfolio planning",
    description:
      "The business-plan and monetization surface for each Tolani platform and stakeholder track.",
    status: "operator-led" as const,
  },
  {
    key: "atlas",
    label: "Platform atlas",
    path: "/platform-engineering",
    owner: "Engineering system",
    description:
      "The shared architecture, memory, commerce, communications, identity, and operator planes underneath the brands.",
    status: "pilot" as const,
  },
  {
    key: "ecosystem",
    label: "Ecosystem",
    path: "/ecosystem",
    owner: "Brand portfolio",
    description:
      "The brand directory that keeps Tolani Corp visible while each operating company keeps its own front door.",
    status: "live-now" as const,
  },
  {
    key: "operations-app",
    label: "Operations app",
    path: "/app",
    owner: "Internal routes",
    description:
      "A central index for command surfaces that operators, staff, and leadership use to move through the system.",
    status: "operator-led" as const,
  },
];

export default function TolaniPreviewPage() {
  const hqLine = getPrimaryHqLine()?.display ?? "(877) 691-2134";
  const scaleReadyCount = platformPlans.filter((plan) => plan.stage === "scale-ready").length;
  const liveCount = platformPlans.filter((plan) => plan.stage === "live").length;

  const metrics = [
    {
      label: "Plans",
      value: String(portfolioMetrics.planCount),
      detail: "Business plans represented across the parent company.",
    },
    {
      label: "Revenue lanes",
      value: String(portfolioMetrics.revenueLaneCount),
      detail: "Named monetization paths tracked in the strategy layer.",
    },
    {
      label: "Comms routes",
      value: String(brandCommunicationProfiles.length),
      detail: "Brand-level communication profiles attached to HQ routing.",
    },
    {
      label: "IVR paths",
      value: String(hqIvrTree.length),
      detail: "Switchboard branches available through the HQ line.",
    },
    {
      label: "Live / scale",
      value: `${liveCount}/${scaleReadyCount}`,
      detail: "Active public engines compared with scale-ready assets.",
    },
  ];

  return (
    <TolaniSitePreview
      hqLine={hqLine}
      metrics={metrics}
      purchaseRoutes={featuredPurchaseChannels.map((route) => ({
        key: route.key,
        platformName: route.platformName,
        route: route.route,
        href: route.href,
        status: route.status,
      }))}
      routes={previewRoutes}
    />
  );
}
