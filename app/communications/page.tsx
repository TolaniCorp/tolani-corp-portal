import Link from "next/link";
import { PurchaseChannelsSection } from "@/components/PurchaseChannels";

import {
  brandCommunicationProfiles,
  enterpriseChannelPolicies,
  enterpriseCommunicationDecision,
  enterpriseCommunicationKpis,
  enterprisePhoneLines,
  hqIvrTree,
  rolloutPlan,
} from "../../lib/enterpriseCommunicationNetwork";
import {
  purchaseChannels,
  portfolioMetrics,
  teamingEvents,
} from "../../lib/portfolioStrategy";

function statusClasses(status: string) {
  switch (status) {
    case "active":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
    case "verification-required":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700";
    case "verification-rejected":
      return "border-rose-500/20 bg-rose-500/10 text-rose-700";
    default:
      return "border-slate-300 bg-slate-100 text-slate-700";
  }
}

export default function CommunicationsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_48%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              Enterprise Communications Network
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              One corporate front door. Clean brand lines behind it.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Tolani Corp should run a hybrid communication model: one HQ switchboard for voice routing and
              separate brand-specific numbers for messaging, customer support, and reputation isolation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <StatCard
              label="Recommended model"
              value="Hybrid network"
              detail="HQ voice switchboard plus separate brand lines"
            />
            <StatCard
              label="Current lines"
              value={String(enterprisePhoneLines.length)}
              detail="Tracked in the parent-company registry"
            />
            <StatCard
              label="Brands covered"
              value={String(brandCommunicationProfiles.length)}
              detail="HQ, Labs, Hook Travel, Listo, BettorsACE, TSG"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/strategy"
              className="inline-flex items-center rounded-full border border-slate-900 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Open portfolio strategy
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
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Panel title="Executive Decision" eyebrow="Recommended approach">
            <p className="text-lg font-semibold text-slate-900">
              {enterpriseCommunicationDecision.summary}
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              {enterpriseCommunicationDecision.why.map((item) => (
                <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Current Number Strategy" eyebrow="Immediate move">
            <div className="space-y-4">
              {enterprisePhoneLines.map((line) => (
                <div key={line.e164} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{line.friendlyName}</p>
                      <p className="text-sm text-slate-600">
                        {line.display} · {line.carrierType}
                      </p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses(line.status)}`}>
                      {line.status.replace(/-/g, " ")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{line.recommendation}</p>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel title="HQ IVR Tree" eyebrow="Tolani Corp switchboard">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {hqIvrTree.map((branch) => (
              <div key={branch.digit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Press {branch.digit}
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{branch.label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{branch.routeSummary}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Brand Routing Profiles" eyebrow="Communication ownership by brand">
          <div className="grid gap-5 lg:grid-cols-2">
            {brandCommunicationProfiles.map((brand) => (
              <div key={brand.key} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{brand.name}</h3>
                    <p className="text-sm text-slate-500">{brand.domain}</p>
                  </div>
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    {brand.aiAgentLabel}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{brand.mission}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MiniList title="Inbound" items={brand.primaryInboundChannels} />
                  <MiniList title="Outbound" items={brand.primaryOutboundChannels} />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MiniList title="Routing" items={brand.supportRouting} />
                  <MiniList title="Escalation" items={brand.escalationTargets} />
                </div>

                <MiniList title="Notes" items={brand.notes} className="mt-5" />
              </div>
            ))}
          </div>
        </Panel>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Channel Policies" eyebrow="How each lane should behave">
            <div className="space-y-4">
              {enterpriseChannelPolicies.map((policy) => (
                <div key={policy.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                      {policy.key}
                    </h3>
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {policy.serviceLevel}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{policy.primaryUse}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-600">
                      AI first: {policy.aiFirst ? "yes" : "no"}
                    </span>
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-600">
                      Human escalation: {policy.humanEscalation ? "yes" : "no"}
                    </span>
                    <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-600">
                      Record: {policy.systemOfRecord}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Rollout Plan" eyebrow="Optimized implementation sequence">
            <div className="space-y-4">
              {rolloutPlan.map((phase) => (
                <div key={phase.phase} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{phase.phase}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">{phase.goal}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
                    {phase.actions.map((action) => (
                      <li key={action} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel title="Operating Metrics" eyebrow="What management should track">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {enterpriseCommunicationKpis.map((kpi) => (
              <div key={kpi} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                {kpi}
              </div>
            ))}
          </div>
        </Panel>

        <PurchaseChannelsSection
          id="purchase-channels"
          eyebrow="Network output"
          title="The communications layer should route buyers into these channels"
          description="HQ voice, brand lines, and operator queues exist to place buyers into the correct purchase path without confusion. Direct checkout stays direct, while consultation, pilot, and retained-account offers stay operator led."
          channels={purchaseChannels}
        />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel title="Why this matters commercially" eyebrow="Portfolio alignment">
            <div className="grid gap-4 sm:grid-cols-2">
              <StatCard
                label="Revenue lanes"
                value={String(portfolioMetrics.revenueLaneCount)}
                detail="The business-plan layer now names where each platform actually makes money."
              />
              <StatCard
                label="Teaming motions"
                value={String(teamingEvents.length)}
                detail="Partnership and event formats can now route leads into the right brand channels."
              />
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              Communications are no longer just support infrastructure. They are part of the
              monetization system because they determine routing quality, lead qualification, trust,
              and conversion speed across every brand.
            </p>
          </Panel>

          <Panel title="Next surfaces" eyebrow="Keep the network connected to the operating plan">
            <div className="space-y-4">
              <SurfaceLink
                href="/strategy"
                title="Portfolio strategy and profitability"
                detail="See the monetization, backend sync, and funding plan for every major platform."
              />
              <SurfaceLink
                href="/platform-engineering"
                title="Platform engineering atlas"
                detail="Review the shared identity, memory, communications, commerce, and operator planes."
              />
              <SurfaceLink
                href="/teaming-events"
                title="Teaming events playbook"
                detail="Use the event formats to turn HQ routing, partner outreach, and brand demos into a repeatable motion."
              />
            </div>
          </Panel>
        </section>
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

function StatCard({
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

function MiniList({
  title,
  items,
  className = "",
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SurfaceLink({
  href,
  title,
  detail,
}: {
  href: string;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 transition-colors hover:border-slate-950 hover:bg-white"
    >
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </Link>
  );
}
