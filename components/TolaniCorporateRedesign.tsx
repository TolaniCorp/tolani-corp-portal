"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PlanStage, PurchaseChannelStatus } from "@/lib/portfolioStrategy";

type PlanCard = {
  key: string;
  name: string;
  domain: string;
  stage: PlanStage;
  category: string;
  headline: string;
  summary: string;
  idealCustomers: string[];
  flagshipProducts: string[];
  monetizationCount: number;
  ninetyDayMoves: string[];
};

type BrandCard = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  color: string;
  accentColor?: string;
  website?: string;
  industries?: string[];
  keyServices?: string[];
};

type RouteCard = {
  key: string;
  platformName: string;
  route: string;
  label: string;
  href: string;
  buyer: string;
  summary: string;
  note: string;
  ctaLabel: string;
  status: PurchaseChannelStatus;
};

type IvrBranchCard = {
  digit: string;
  label: string;
  routeSummary: string;
};

type TolaniCorporateRedesignProps = {
  plans: PlanCard[];
  brands: BrandCard[];
  routes: RouteCard[];
  metrics: {
    planCount: number;
    revenueLaneCount: number;
    stakeholderTrackCount: number;
    teamingEventCount: number;
    communicationRouteCount: number;
    phoneLineCount: number;
    ivrBranchCount: number;
  };
  hqLine: string;
  ivrBranches: IvrBranchCard[];
};

type LensKey = "operator" | "investor" | "partner" | "builder";

const lenses: Array<{
  key: LensKey;
  label: string;
  title: string;
  summary: string;
  emphasis: string[];
}> = [
  {
    key: "operator",
    label: "Operator",
    title: "Route work into the right business lane.",
    summary:
      "Use the homepage as a dispatch layer for portfolio plans, project intake, support routing, and operating follow-through.",
    emphasis: ["Communications", "Open routes", "90-day moves"],
  },
  {
    key: "investor",
    label: "Investor",
    title: "See where revenue proof is strongest.",
    summary:
      "Review live channels, monetization paths, and the operating evidence needed before expansion capital is introduced.",
    emphasis: ["Revenue lanes", "Stage clarity", "Funding posture"],
  },
  {
    key: "partner",
    label: "Partner",
    title: "Find the right collaboration surface.",
    summary:
      "Match schools, suppliers, travel partners, builders, and platform vendors to the correct Tolani company and follow-up route.",
    emphasis: ["Brand fit", "Event motion", "Support owner"],
  },
  {
    key: "builder",
    label: "Builder",
    title: "Keep each product distinct and aligned.",
    summary:
      "Treat the site as the public index for identity, communications, commerce, governance, and product execution work.",
    emphasis: ["Platform atlas", "Shared systems", "Governance"],
  },
];

const stageFilters: Array<{ key: "all" | PlanStage; label: string }> = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "scale-ready", label: "Scale ready" },
  { key: "active-build", label: "Active build" },
  { key: "emerging", label: "Emerging" },
];

const stageCopy: Record<PlanStage, string> = {
  live: "Live",
  "scale-ready": "Scale ready",
  "active-build": "Active build",
  emerging: "Emerging",
};

const statusCopy: Record<PurchaseChannelStatus, string> = {
  "live-now": "Live now",
  "operator-led": "Operator led",
  pilot: "Pilot lane",
  private: "Private route",
};

const brandLogoFallbacks: Record<string, string> = {
  "tolani-corp": "/assets/brand/logo.svg",
  "tolani-labs": "/assets/labs/logo.svg",
  "tccg-work": "/assets/tccg/logo-transparent.svg",
  hooktravel: "/assets/hooktravel/logo.svg",
  "tut-token": "/assets/tut/logo.svg",
};

function stageClass(stage: PlanStage) {
  if (stage === "live") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (stage === "scale-ready") return "border-sky-200 bg-sky-50 text-sky-800";
  if (stage === "active-build") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function statusClass(status: PurchaseChannelStatus) {
  if (status === "live-now") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "operator-led") return "border-sky-200 bg-sky-50 text-sky-800";
  if (status === "pilot") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-100 text-slate-700";
}

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function SurfaceLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "gold" | "sky" | "emerald" | "slate";
}) {
  const toneClass = {
    gold: "border-[#c9a963]/30 bg-[#c9a963]/10 text-[#ffe2a3]",
    sky: "border-sky-300/25 bg-sky-300/10 text-sky-100",
    emerald: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    slate: "border-white/15 bg-white/10 text-white",
  }[tone];

  return (
    <div className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-normal">{value}</p>
    </div>
  );
}

export function TolaniCorporateRedesign({
  plans,
  brands,
  routes,
  metrics,
  hqLine,
  ivrBranches,
}: TolaniCorporateRedesignProps) {
  const [activeLens, setActiveLens] = useState<LensKey>("operator");
  const [activeStage, setActiveStage] = useState<"all" | PlanStage>("all");
  const [activeRouteKey, setActiveRouteKey] = useState(routes[0]?.key ?? "");

  const selectedLens = lenses.find((lens) => lens.key === activeLens) ?? lenses[0];
  const selectedRoute = routes.find((route) => route.key === activeRouteKey) ?? routes[0];

  const filteredPlans = useMemo(() => {
    if (activeStage === "all") return plans;
    return plans.filter((plan) => plan.stage === activeStage);
  }, [activeStage, plans]);

  const priorityBrands = useMemo(() => {
    const orderedIds = ["tccg-work", "tolani-labs", "hooktravel", "bettorsace", "tolani-supply-group", "tut-token"];
    return orderedIds.map((id) => brands.find((brand) => brand.id === id)).filter(Boolean) as BrandCard[];
  }, [brands]);

  return (
    <div className="bg-white text-slate-950">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="mb-8 inline-flex w-fit items-center gap-3 rounded-lg border border-white/12 bg-white/6 px-4 py-3">
              <Image src="/assets/brand/logo.svg" alt="Tolani Corp" width={190} height={54} className="h-9 w-auto" priority />
              <span className="hidden h-8 w-px bg-white/15 sm:block" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">Portfolio OS</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a963]">Corporate redesign scaffold</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal text-white sm:text-6xl">
              Tolani Corp should feel like the command center for every company it owns.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              A cleaner parent-company surface for strategy, communications, construction intake, learning platforms, travel,
              sports intelligence, trade operations, and future TUT governance without forcing every visitor through one generic lane.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/communications"
                className="inline-flex min-h-12 items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-[#c9a963]"
              >
                Open communications network
              </Link>
              <Link
                href="/strategy"
                className="inline-flex min-h-12 items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#c9a963] hover:text-[#ffe2a3]"
              >
                Review portfolio strategy
              </Link>
              <Link
                href="#portfolio-console"
                className="inline-flex min-h-12 items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white hover:text-white"
              >
                Open live console
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <Metric label="Plans" value={metrics.planCount} tone="gold" />
              <Metric label="Revenue lanes" value={metrics.revenueLaneCount} tone="sky" />
              <Metric label="Brand routes" value={metrics.communicationRouteCount} tone="emerald" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-lg border border-white/12 bg-white/[0.04] p-4 shadow-2xl">
              <div className="rounded-lg border border-white/10 bg-[#07111f] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">HQ Switchboard</p>
                    <p className="mt-2 text-3xl font-black tracking-normal text-white">{hqLine}</p>
                  </div>
                  <span className="rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
                    Voice first
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  {ivrBranches.map((branch) => (
                    <div key={branch.digit} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-lg border border-white/10 bg-black/24 p-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg font-black">
                        {branch.digit}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{branch.label}</p>
                        <p className="mt-1 text-sm leading-6 text-white/62">{branch.routeSummary}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Metric label="Lines" value={metrics.phoneLineCount} tone="slate" />
                  <Metric label="IVR paths" value={metrics.ivrBranchCount} tone="slate" />
                  <Metric label="Events" value={metrics.teamingEventCount} tone="slate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-console" className="border-b border-slate-200 bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Audience lens</p>
              <div className="mt-4 grid gap-2">
                {lenses.map((lens) => (
                  <button
                    type="button"
                    key={lens.key}
                    onClick={() => setActiveLens(lens.key)}
                    className={`min-h-12 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      activeLens === lens.key
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-950"
                    }`}
                  >
                    {lens.label}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-xl font-black tracking-normal text-slate-950">{selectedLens.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{selectedLens.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedLens.emphasis.map((item) => (
                    <span key={item} className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Portfolio console</p>
                  <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                    Active companies, stages, and execution moves.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    The redesign shifts the homepage away from a static marketing page and toward a board that helps visitors
                    understand which company owns the next action.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stageFilters.map((filter) => (
                    <button
                      type="button"
                      key={filter.key}
                      onClick={() => setActiveStage(filter.key)}
                      className={`min-h-10 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                        activeStage === filter.key
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-950"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                {filteredPlans.map((plan) => (
                  <article key={plan.key} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{plan.category}</p>
                        <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">{plan.name}</h3>
                      </div>
                      <span className={`rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${stageClass(plan.stage)}`}>
                        {stageCopy[plan.stage]}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{plan.headline}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Domain</p>
                        <p className="mt-2 truncate text-sm font-semibold text-slate-950">{plan.domain}</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Revenue</p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">{plan.monetizationCount} lanes</p>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Customers</p>
                        <p className="mt-2 truncate text-sm font-semibold text-slate-950">{plan.idealCustomers[0]}</p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next operating move</p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{plan.ninetyDayMoves[0]}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="purchase-channels" className="bg-white px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Front-door routes</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                Buyers and partners should never guess where to enter.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Each route has a different risk profile: direct purchase, consultation intake, pilot review, or private utility brief.
                The new homepage makes that distinction visible before a visitor reaches a form.
              </p>
              <div className="mt-8 grid gap-2">
                {routes.map((route) => (
                  <button
                    type="button"
                    key={route.key}
                    onClick={() => setActiveRouteKey(route.key)}
                    className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                      selectedRoute?.key === route.key
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-950"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">{route.platformName}</span>
                      <span className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass(route.status)}`}>
                        {statusCopy[route.status]}
                      </span>
                    </span>
                    <span className={`mt-1 block text-xs leading-5 ${selectedRoute?.key === route.key ? "text-white/65" : "text-slate-500"}`}>
                      {route.route}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedRoute ? (
              <article className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Selected route</p>
                    <h3 className="mt-2 text-3xl font-black tracking-normal text-slate-950">{selectedRoute.label}</h3>
                  </div>
                  <span className={`rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(selectedRoute.status)}`}>
                    {statusCopy[selectedRoute.status]}
                  </span>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-700">{selectedRoute.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Buyer</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{selectedRoute.buyer}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Route</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{selectedRoute.route}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
                  {selectedRoute.note}
                </div>
                <div className="mt-6">
                  <SurfaceLink
                    href={selectedRoute.href}
                    className="inline-flex min-h-11 items-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    {selectedRoute.ctaLabel}
                  </SurfaceLink>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc,#ffffff)] px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operating model</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
                Parent-company control with brand-specific accountability.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Alphabet’s clean parent-company framing and SoftBank’s explicit strategy and segment navigation both point to
                the same principle: keep the parent surface clear, then show how each company contributes to the whole.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stakeholders</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{metrics.stakeholderTrackCount}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Comms routes</p>
                  <p className="mt-2 text-3xl font-black text-slate-950">{metrics.communicationRouteCount}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">HQ line</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{hqLine}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                {
                  period: "Now",
                  title: "Make the homepage the corporate router",
                  body: "Surface active brands, purchase channels, and communications posture before visitors enter a product.",
                },
                {
                  period: "Next 30",
                  title: "Connect routes to real operating queues",
                  body: "Wire high-intent entries into the communications network, TCCG consultation flow, Labs intake, and TUT private brief.",
                },
                {
                  period: "Next 90",
                  title: "Turn strategy pages into management surfaces",
                  body: "Attach proof metrics, route outcomes, and stakeholder follow-through so the public site reflects operating truth.",
                },
              ].map((item) => (
                <article key={item.period} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6a25]">{item.period}</p>
                  <h3 className="mt-2 text-xl font-black tracking-normal text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-16 text-white lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c9a963]">Brand surfaces</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-white sm:text-4xl">
                One parent brand, distinct operating companies.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65">
                The redesign keeps each brand visible while giving Tolani Corp a stronger executive layer above the system.
              </p>
            </div>
            <Link
              href="/ecosystem"
              className="inline-flex min-h-11 items-center rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#c9a963] hover:text-[#ffe2a3]"
            >
              View ecosystem
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {priorityBrands.map((brand) => {
              const logo = brand.logo ?? brandLogoFallbacks[brand.id];
              return (
                <article key={brand.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-white/10 bg-white p-2">
                      {logo ? (
                        <Image src={logo} alt={`${brand.name} logo`} width={110} height={44} className="max-h-10 w-auto object-contain" />
                      ) : (
                        <span className="text-lg font-black text-slate-950">{brand.name.slice(0, 2)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black tracking-normal text-white">{brand.name}</h3>
                      <p className="mt-1 truncate text-sm text-[#f0d18f]">{brand.tagline}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/65">{brand.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(brand.industries ?? []).slice(0, 2).map((industry) => (
                      <span key={industry} className="rounded-md border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/60">
                        {industry}
                      </span>
                    ))}
                  </div>
                  {brand.website ? (
                    <div className="mt-5">
                      <a href={brand.website} className="text-sm font-semibold text-white hover:text-[#f0d18f]">
                        Open surface &rarr;
                      </a>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
