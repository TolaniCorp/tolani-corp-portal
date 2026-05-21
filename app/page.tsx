import { TolaniCorporateRedesign } from "@/components/TolaniCorporateRedesign";
import { ecosystemBrands } from "@/lib/brands";
import { brandCommunicationProfiles, enterprisePhoneLines, getPrimaryHqLine, hqIvrTree } from "@/lib/enterpriseCommunicationNetwork";
import { featuredPurchaseChannels, platformPlans, portfolioMetrics, teamingEvents } from "@/lib/portfolioStrategy";

export default function Home() {
  const hqLine = getPrimaryHqLine()?.display ?? "(877) 691-2134";

  return (
    <TolaniCorporateRedesign
      plans={platformPlans.map((plan) => ({
        key: plan.key,
        name: plan.name,
        domain: plan.domain,
        stage: plan.stage,
        category: plan.category,
        headline: plan.headline,
        summary: plan.summary,
        idealCustomers: plan.idealCustomers,
        flagshipProducts: plan.flagshipProducts,
        monetizationCount: plan.monetizationSchema.length,
        ninetyDayMoves: plan.ninetyDayMoves,
      }))}
      brands={ecosystemBrands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        tagline: brand.tagline,
        description: brand.description,
        logo: brand.logo,
        color: brand.color,
        accentColor: brand.accentColor,
        website: brand.website,
        industries: brand.industries,
        keyServices: brand.keyServices,
      }))}
      routes={featuredPurchaseChannels.map((channel) => ({
        key: channel.key,
        platformName: channel.platformName,
        route: channel.route,
        label: channel.label,
        href: channel.href,
        buyer: channel.buyer,
        summary: channel.summary,
        note: channel.note,
        ctaLabel: channel.ctaLabel,
        status: channel.status,
      }))}
      metrics={{
        planCount: portfolioMetrics.planCount,
        revenueLaneCount: portfolioMetrics.revenueLaneCount,
        stakeholderTrackCount: portfolioMetrics.stakeholderTrackCount,
        teamingEventCount: teamingEvents.length,
        communicationRouteCount: brandCommunicationProfiles.length,
        phoneLineCount: enterprisePhoneLines.length,
        ivrBranchCount: hqIvrTree.length,
      }}
      hqLine={hqLine}
      ivrBranches={hqIvrTree.map((branch) => ({
        digit: branch.digit,
        label: branch.label,
        routeSummary: branch.routeSummary,
      }))}
    />
  );
}
