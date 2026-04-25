import Link from "next/link";
import { PurchaseChannelsSection } from "@/components/PurchaseChannels";

import {
  platformPlans,
  portfolioMetrics,
  portfolioStrategySummary,
  purchaseChannels,
  stakeholderBriefs,
} from "../../lib/portfolioStrategy";

function stageClasses(stage: string) {
  switch (stage) {
    case "live":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
    case "scale-ready":
      return "border-sky-500/20 bg-sky-500/10 text-sky-700";
    case "active-build":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700";
    default:
      return "border-slate-300 bg-slate-100 text-slate-700";
  }
}

export default function StrategyPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff,#f8fafc_24%,#eef2ff_100%)] text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-5xl space-y-6">
            <div className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              Portfolio Strategy
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Business plans, monetization logic, and profitability schemas for every major platform.
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-slate-600">
              {portfolioStrategySummary.thesis}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-slate-500">
              {portfolioStrategySummary.operatingRule}
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            <MetricCard
              label="Platform plans"
              value={String(portfolioMetrics.planCount)}
              detail="Each major project now has a defined business and execution plan."
            />
            <MetricCard
              label="Revenue lanes"
              value={String(portfolioMetrics.revenueLaneCount)}
              detail="Direct monetization paths tracked across the portfolio."
            />
            <MetricCard
              label="Stakeholder tracks"
              value={String(portfolioMetrics.stakeholderTrackCount)}
              detail="Distinct funding and partnership narratives for different capital sources."
            />
            <MetricCard
              label="Execution rule"
              value="1"
              detail="Public narrative must stay aligned with real backend logic and measurable margins."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/platform-engineering"
              className="inline-flex items-center rounded-full border border-slate-900 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Open platform atlas
            </Link>
            <Link
              href="/teaming-events"
              className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-slate-950"
            >
              View teaming events
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-6 py-14 lg:px-10">
        <Panel eyebrow="Funding stakeholders" title="The summary layer for capital and strategic partners">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {stakeholderBriefs.map((brief) => (
              <article key={brief.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{brief.audience}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">{brief.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{brief.whyNow}</p>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Offer</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{brief.offer}</p>
                </div>
                <ul className="mt-4 space-y-2">
                  {brief.proofPack.map((proof) => (
                    <li key={proof} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                      {proof}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Panel>

        <PurchaseChannelsSection
          id="purchase-channels"
          eyebrow="Commercial entry points"
          title="Each platform now has a named purchase or operator-entry route"
          description="The portfolio should not make buyers guess how to engage. Use direct site checkout where the front door is already live, and use operator-routed channels where the offer is still consultation, pilot, or retained-account led. None of these routes depends on wallet extensions."
          channels={purchaseChannels}
        />

        <Panel eyebrow="Platform plans" title="Each project now has a monetization path and an execution sequence">
          <div className="space-y-6">
            {platformPlans.map((plan) => (
              <article key={plan.key} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{plan.category}</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{plan.name}</h2>
                    <p className="mt-4 text-lg font-semibold text-slate-800">{plan.headline}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{plan.summary}</p>
                  </div>
                  <div className="space-y-3">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${stageClasses(plan.stage)}`}>
                      {plan.stage.replace(/-/g, " ")}
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-500">
                      <div>{plan.domain}</div>
                      <div className="break-all">{plan.repo}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
                  <InfoList title="Ideal customers" items={plan.idealCustomers} />
                  <InfoList title="Flagship products" items={plan.flagshipProducts} />
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Monetization schema</p>
                    <div className="mt-4 space-y-4">
                      {plan.monetizationSchema.map((lane) => (
                        <div key={lane.name} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <h3 className="text-lg font-bold text-slate-950">{lane.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-700">{lane.model}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{lane.profitabilityLever}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Profitability schema</p>
                    <p className="mt-4 text-sm leading-7 text-slate-700">{plan.profitabilitySchema.revenueEngine}</p>
                    <InfoList title="Cost structure" items={plan.profitabilitySchema.costStructure} className="mt-5" />
                    <InfoList title="Margin levers" items={plan.profitabilitySchema.marginLevers} className="mt-5" />
                    <InfoList title="Proof metrics" items={plan.profitabilitySchema.proofMetrics} className="mt-5" />
                  </section>
                </div>

                <div className="mt-6 grid gap-5 xl:grid-cols-3">
                  <InfoList title="Marketing priorities" items={plan.marketingPriorities} />
                  <InfoList title="Backend sync priorities" items={plan.backendSyncPriorities} />
                  <InfoList title="90-day moves" items={plan.ninetyDayMoves} />
                </div>

                <section className="mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Funding summary</p>
                  <p className="mt-4 text-lg font-semibold text-white">{plan.fundingSummary.narrative}</p>
                  <p className="mt-3 text-sm leading-7 text-white/75">{plan.fundingSummary.recommendedCapital}</p>
                  <div className="mt-5 grid gap-4 xl:grid-cols-2">
                    <InfoList title="Use of funds" items={plan.fundingSummary.useOfFunds} inverse />
                    <InfoList title="Diligence hooks" items={plan.fundingSummary.diligenceHooks} inverse />
                  </div>
                </section>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </main>
  );
}

function Panel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

function InfoList({
  title,
  items,
  className = "",
  inverse = false,
}: {
  title: string;
  items: string[];
  className?: string;
  inverse?: boolean;
}) {
  const itemClasses = inverse
    ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white/75"
    : "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700";

  return (
    <div className={className}>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${inverse ? "text-white/55" : "text-slate-500"}`}>
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className={itemClasses}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
