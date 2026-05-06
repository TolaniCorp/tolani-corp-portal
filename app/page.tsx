import { Hero } from "../components/Hero";
import { CommandSurfaces } from "../components/CommandSurfaces";
import { DynamicCommandCenter } from "../components/DynamicCommandCenter";
import { LiveAnnouncements } from "../components/LiveAnnouncements";
import { Portfolio } from "../components/Portfolio";
import { PurchaseChannelsSection } from "../components/PurchaseChannels";
import { brandCommunicationProfiles } from "../lib/enterpriseCommunicationNetwork";
import { getLiveAnnouncements } from "../lib/live-announcements";
import { platformNodes, signatureLoops, systemPlanes } from "../lib/platformEngineeringAtlas";
import { featuredPurchaseChannels, portfolioMetrics } from "../lib/portfolioStrategy";

export default async function Home() {
  const announcements = await getLiveAnnouncements(3);

  return (
    <>
      <Hero />
      <DynamicCommandCenter
        metrics={{
          planCount: portfolioMetrics.planCount,
          revenueLaneCount: portfolioMetrics.revenueLaneCount,
          stakeholderTrackCount: portfolioMetrics.stakeholderTrackCount,
          systemPlaneCount: systemPlanes.length,
          platformNodeCount: platformNodes.length,
          signatureLoopCount: signatureLoops.length,
          communicationRouteCount: brandCommunicationProfiles.length,
        }}
        channels={featuredPurchaseChannels.map((channel) => ({
          key: channel.key,
          platformName: channel.platformName,
          label: channel.label,
          status: channel.status,
          route: channel.route,
          buyer: channel.buyer,
          href: channel.href,
          ctaLabel: channel.ctaLabel,
        }))}
        systemPlanes={systemPlanes.map((plane) => ({
          name: plane.name,
          headline: plane.headline,
          systems: plane.systems,
        }))}
        signatureLoops={signatureLoops.map((loop) => ({
          name: loop.name,
          ownedBy: loop.ownedBy,
          summary: loop.summary,
          motion: loop.motion,
        }))}
        communicationProfiles={brandCommunicationProfiles.map((profile) => ({
          name: profile.name,
          mission: profile.mission,
          aiAgentLabel: profile.aiAgentLabel,
          primaryInboundChannels: profile.primaryInboundChannels,
        }))}
      />
      <CommandSurfaces />
      <section className="bg-white px-6 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <LiveAnnouncements announcements={announcements} />
        </div>
      </section>
      <section className="bg-[linear-gradient(180deg,#ffffff,#f8fafc_40%,#eef2ff_100%)] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PurchaseChannelsSection
            id="purchase-channels"
            title="Current buy-now and operator-entry routes"
            description="These are the active purchase channels across the Tolani portfolio right now. They are direct site, consultation, or operator-routed paths. None of these public routes requires a crypto wallet."
            channels={featuredPurchaseChannels}
          />
        </div>
      </section>
      <Portfolio />
    </>
  );
}
