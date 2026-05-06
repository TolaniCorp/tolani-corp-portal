"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Metric = {
  label: string;
  value: string;
  detail: string;
};

type Lens = {
  key: string;
  label: string;
  eyebrow: string;
  headline: string;
  summary: string;
  accent: string;
  metrics: Metric[];
};

type RouteChannel = {
  key: string;
  platformName: string;
  label: string;
  status: "live-now" | "operator-led" | "pilot" | "private";
  route: string;
  buyer: string;
  href: string;
  ctaLabel: string;
};

type SystemPlane = {
  name: string;
  headline: string;
  systems: string[];
};

type SignatureLoop = {
  name: string;
  ownedBy: string;
  summary: string;
  motion: string[];
};

type CommunicationProfile = {
  name: string;
  mission: string;
  aiAgentLabel: string;
  primaryInboundChannels: string[];
};

type DynamicCommandCenterProps = {
  metrics: {
    planCount: number;
    revenueLaneCount: number;
    stakeholderTrackCount: number;
    systemPlaneCount: number;
    platformNodeCount: number;
    signatureLoopCount: number;
    communicationRouteCount: number;
  };
  channels: RouteChannel[];
  systemPlanes: SystemPlane[];
  signatureLoops: SignatureLoop[];
  communicationProfiles: CommunicationProfile[];
};

const statusLabels: Record<RouteChannel["status"], string> = {
  "live-now": "Live",
  "operator-led": "Operator",
  pilot: "Pilot",
  private: "Private",
};

const statusClasses: Record<RouteChannel["status"], string> = {
  "live-now": "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  "operator-led": "border-sky-300/25 bg-sky-300/10 text-sky-100",
  pilot: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  private: "border-white/15 bg-white/10 text-white/70",
};

function audienceLenses(metrics: DynamicCommandCenterProps["metrics"]): Lens[] {
  return [
    {
      key: "operator",
      label: "Operator",
      eyebrow: "HQ control",
      headline: "Route every request into the right portfolio lane.",
      summary:
        "Operators see the system as a dispatch layer: portfolio plans, communications routes, and support motions stay connected from the first click.",
      accent: "bg-tolani-gold",
      metrics: [
        { label: "Plans", value: String(metrics.planCount), detail: "Business surfaces" },
        { label: "Routes", value: String(metrics.communicationRouteCount), detail: "Brand intake paths" },
        { label: "Loops", value: String(metrics.signatureLoopCount), detail: "Repeatable motions" },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      eyebrow: "Capital view",
      headline: "Show how strategy, proof, and revenue lanes connect.",
      summary:
        "Investor-facing signals emphasize cashflow paths, stakeholder tracks, operational proof, and how each brand can compound under one parent model.",
      accent: "bg-emerald-400",
      metrics: [
        { label: "Revenue", value: String(metrics.revenueLaneCount), detail: "Named lanes" },
        { label: "Tracks", value: String(metrics.stakeholderTrackCount), detail: "Stakeholder briefs" },
        { label: "Nodes", value: String(metrics.platformNodeCount), detail: "Mapped platforms" },
      ],
    },
    {
      key: "partner",
      label: "Partner",
      eyebrow: "Partner path",
      headline: "Make the front door obvious for each relationship.",
      summary:
        "Partners can scan where to enter, what the buyer context is, and which Tolani surface owns follow-through without wallet or extension friction.",
      accent: "bg-sky-400",
      metrics: [
        { label: "Channels", value: String(metrics.communicationRouteCount), detail: "Contact profiles" },
        { label: "Systems", value: String(metrics.systemPlaneCount), detail: "Shared planes" },
        { label: "Offers", value: String(metrics.planCount), detail: "Portfolio plans" },
      ],
    },
    {
      key: "employee",
      label: "Employee",
      eyebrow: "Internal rhythm",
      headline: "Give teams a live map of what is moving.",
      summary:
        "Employees get a concise operating view that points to announcements, systems, purchase paths, and the loops behind execution.",
      accent: "bg-violet-400",
      metrics: [
        { label: "Signals", value: String(metrics.platformNodeCount), detail: "Tracked nodes" },
        { label: "Planes", value: String(metrics.systemPlaneCount), detail: "Shared systems" },
        { label: "Motions", value: String(metrics.signatureLoopCount), detail: "Operating loops" },
      ],
    },
  ];
}

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-tolani-gold";

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

export function DynamicCommandCenter({
  metrics,
  channels,
  systemPlanes,
  signatureLoops,
  communicationProfiles,
}: DynamicCommandCenterProps) {
  const lenses = useMemo(() => audienceLenses(metrics), [metrics]);
  const [activeLensKey, setActiveLensKey] = useState(lenses[0].key);
  const [activeChannelKey, setActiveChannelKey] = useState(channels[0]?.key ?? "");
  const [activeLoopIndex, setActiveLoopIndex] = useState(0);

  const activeLens = lenses.find((lens) => lens.key === activeLensKey) ?? lenses[0];
  const activeChannel = channels.find((channel) => channel.key === activeChannelKey) ?? channels[0];
  const activeLoop = signatureLoops[activeLoopIndex] ?? signatureLoops[0];
  const activePlane = systemPlanes[activeLoopIndex % Math.max(systemPlanes.length, 1)];
  const activeProfile = communicationProfiles[activeLoopIndex % Math.max(communicationProfiles.length, 1)];

  return (
    <section className="bg-slate-950 px-6 py-16 text-white lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tolani-gold">
              Dynamic operating UX
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Portfolio command center
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              A living interface for the Tolani operating model: choose an audience lens, inspect
              active routes, and see which system loop should own the next move.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 sm:grid-cols-4">
              {lenses.map((lens) => {
                const isActive = lens.key === activeLens.key;
                return (
                  <button
                    key={lens.key}
                    type="button"
                    onClick={() => setActiveLensKey(lens.key)}
                    className={`min-h-12 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {lens.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <span className={`h-3 w-3 rounded-full ${activeLens.accent}`} />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  {activeLens.eyebrow}
                </p>
              </div>
              <h3 className="mt-4 text-2xl font-black tracking-tight text-white">
                {activeLens.headline}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{activeLens.summary}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {activeLens.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{metric.label}</p>
                    <p className="mt-2 text-3xl font-black text-white">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                    Route board
                  </p>
                  <h3 className="mt-2 text-xl font-black tracking-tight">Active entry paths</h3>
                </div>
                <span className="rounded-full border border-tolani-gold/30 bg-tolani-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-tolani-gold">
                  No wallet required
                </span>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="grid gap-2">
                  {channels.map((channel) => {
                    const isActive = channel.key === activeChannel?.key;
                    return (
                      <button
                        key={channel.key}
                        type="button"
                        onClick={() => setActiveChannelKey(channel.key)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                          isActive
                            ? "border-tolani-gold/60 bg-tolani-gold/10"
                            : "border-white/10 bg-black/20 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-white">{channel.platformName}</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusClasses[channel.status]}`}>
                            {statusLabels[channel.status]}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/55">{channel.route}</p>
                      </button>
                    );
                  })}
                </div>

                {activeChannel ? (
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                      {activeChannel.platformName}
                    </p>
                    <h4 className="mt-3 text-2xl font-black tracking-tight text-white">
                      {activeChannel.label}
                    </h4>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Route</p>
                        <p className="mt-2 text-sm leading-6 text-white/72">{activeChannel.route}</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">Buyer</p>
                        <p className="mt-2 text-sm leading-6 text-white/72">{activeChannel.buyer}</p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <ActionLink href={activeChannel.href}>{activeChannel.ctaLabel}</ActionLink>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                      Operating loops
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight">{activeLoop?.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    {signatureLoops.map((loop, index) => (
                      <button
                        key={loop.name}
                        type="button"
                        aria-label={loop.name}
                        onClick={() => setActiveLoopIndex(index)}
                        className={`h-2.5 w-7 rounded-full transition-colors ${
                          index === activeLoopIndex ? "bg-tolani-gold" : "bg-white/18 hover:bg-white/35"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">{activeLoop?.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeLoop?.motion.map((step, index) => (
                    <span
                      key={step}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70"
                    >
                      {index + 1}. {step}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                  System plane
                </p>
                <h3 className="mt-2 text-xl font-black tracking-tight">{activePlane?.name}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{activePlane?.headline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {activePlane?.systems.slice(0, 5).map((system) => (
                    <span
                      key={system}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/65"
                    >
                      {system}
                    </span>
                  ))}
                </div>
                {activeProfile ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
                      {activeProfile.aiAgentLabel}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{activeProfile.mission}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
