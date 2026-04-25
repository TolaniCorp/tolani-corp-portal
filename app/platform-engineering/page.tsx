import Link from "next/link";
import { PurchaseChannelsSection } from "@/components/PurchaseChannels";

import {
  buildWaves,
  enterprisePossibilities,
  platformNodes,
  signatureLoops,
  systemPlanes,
  tolaniGridSummary,
} from "../../lib/platformEngineeringAtlas";
import {
  featuredPurchaseChannels,
  portfolioMetrics,
  stakeholderBriefs,
} from "../../lib/portfolioStrategy";

function maturityClasses(maturity: string) {
  switch (maturity) {
    case "live":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
    case "active-build":
      return "border-sky-500/20 bg-sky-500/10 text-sky-700";
    case "emerging":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700";
    default:
      return "border-slate-300 bg-slate-100 text-slate-700";
  }
}

export default function PlatformEngineeringPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff,#f8fafc_28%,#eef2ff_100%)] text-slate-950">
      <section className="border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-5xl space-y-6">
            <div className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              Platform Engineering Atlas
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              {tolaniGridSummary.name}
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-slate-600">
              {tolaniGridSummary.statement}
            </p>
            <p className="max-w-3xl text-sm leading-7 text-slate-500">
              {tolaniGridSummary.thesis}
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Metric
              label="Platforms mapped"
              value={String(platformNodes.length)}
              detail="Live products, active builds, and shared infrastructure"
            />
            <Metric
              label="System planes"
              value={String(systemPlanes.length)}
              detail="Identity, memory, communications, commerce, operator, and research"
            />
            <Metric
              label="Signature loops"
              value={String(signatureLoops.length)}
              detail="Distinct user journeys that can compound across the portfolio"
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
        <Panel eyebrow="Workspace analysis" title="The portfolio already wants to become one system">
          <div className="grid gap-5 lg:grid-cols-3">
            {platformNodes.map((node) => (
              <article key={node.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">{node.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{node.category.replace(/-/g, " ")}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${maturityClasses(node.maturity)}`}>
                    {node.maturity.replace(/-/g, " ")}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{node.role}</p>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Signature</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{node.signature}</p>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shared systems</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {node.sharedSystems.map((system) => (
                      <span key={system} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-5 break-all text-xs text-slate-400">{node.repo}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Shared architecture" title="Six system planes can unify the enterprise without flattening the brands">
          <div className="grid gap-5 xl:grid-cols-2">
            {systemPlanes.map((plane) => (
              <article key={plane.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-2xl font-black tracking-tight text-slate-950">{plane.name}</h3>
                <p className="mt-2 text-lg font-semibold text-slate-700">{plane.headline}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{plane.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {plane.systems.map((system) => (
                    <span key={system} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                      {system}
                    </span>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Future potential</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{plane.futurePotential}</p>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel eyebrow="Memorable motions" title="Signature loops make the enterprise feel alive">
            <div className="space-y-4">
              {signatureLoops.map((loop) => (
                <article key={loop.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{loop.ownedBy}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{loop.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{loop.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {loop.motion.map((step) => (
                      <span key={step} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {step}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel eyebrow="Future possibilities" title="What makes this special is not the number of apps, but the coherence between them">
            <div className="space-y-4">
              {enterprisePossibilities.map((possibility) => (
                <div key={possibility} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-700">
                  {possibility}
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <Panel eyebrow="Build sequence" title="Three waves can turn the current workspace into a memorable enterprise platform">
          <div className="grid gap-5 lg:grid-cols-3">
            {buildWaves.map((wave) => (
              <article key={wave.wave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{wave.wave}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{wave.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{wave.objective}</p>
                <ul className="mt-5 space-y-2">
                  {wave.moves.map((move) => (
                    <li key={move} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                      {move}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Panel>

        <PurchaseChannelsSection
          id="purchase-channels"
          eyebrow="Commercial proof"
          title="The architecture has to terminate in real buyer entry points"
          description="Identity, communications, commerce, and operator planes matter because they route real buyers into the right live surface. These are the clearest current purchase channels exposed by the portfolio today, and they stay web, consultation, or operator routed instead of wallet gated."
          channels={featuredPurchaseChannels}
        />

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel eyebrow="Funding readiness" title="Strategy, monetization, and stakeholder motion now live alongside the architecture">
            <div className="grid gap-4 sm:grid-cols-2">
              <Metric
                label="Platform plans"
                value={String(portfolioMetrics.planCount)}
                detail="Each major project now has a monetization and profitability schema."
              />
              <Metric
                label="Stakeholder tracks"
                value={String(stakeholderBriefs.length)}
                detail="Distinct summaries for operators, education partners, strategic allies, and treasury stakeholders."
              />
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">
              The public architecture now has a matching business plan layer, which makes the
              enterprise easier to explain to funders, partners, and internal operators.
            </p>
          </Panel>

          <Panel eyebrow="Go deeper" title="Use the new surfaces to keep product narrative and backend truth aligned">
            <div className="space-y-4">
              <ActionLink
                href="/strategy"
                title="Portfolio strategy and profitability"
                detail="Business plan, monetization lanes, backend sync priorities, and funding posture for each platform."
              />
              <ActionLink
                href="/teaming-events"
                title="Teaming events and partnership motions"
                detail="Event formats, required proof assets, and follow-through sequences for operators and partners."
              />
              <ActionLink
                href="/communications"
                title="Enterprise communications network"
                detail="How the switchboard, voice agents, and brand routing support the portfolio operating model."
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

function Metric({
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

function ActionLink({
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
