"use client";

import { useMemo, useState } from "react";

import type {
  BrandCommunicationProfile,
  BrandKey,
  ChannelKey,
  ChannelPolicy,
  IvrBranch,
  PhoneLine,
} from "@/lib/enterpriseCommunicationNetwork";

type CommunicationsConsoleProps = {
  profiles: BrandCommunicationProfile[];
  policies: ChannelPolicy[];
  phoneLines: PhoneLine[];
  ivrTree: IvrBranch[];
  kpis: string[];
};

const channelLabels: Record<ChannelKey, string> = {
  voice: "Voice",
  sms: "SMS",
  whatsapp: "WhatsApp",
  email: "Email",
  "web-chat": "Web chat",
  discord: "Discord",
  slack: "Slack",
};

const statusStyles: Record<PhoneLine["status"], string> = {
  active: "border-emerald-300 bg-emerald-50 text-emerald-700",
  "verification-required": "border-amber-300 bg-amber-50 text-amber-800",
  "verification-rejected": "border-rose-300 bg-rose-50 text-rose-700",
  planned: "border-slate-300 bg-slate-50 text-slate-700",
};

function labelizeStatus(status: string) {
  return status.replace(/-/g, " ");
}

function matchingLineForBrand(lines: PhoneLine[], brandKey: BrandKey) {
  return lines.find((line) => line.brandOwner === brandKey) ?? null;
}

export function CommunicationsConsole({
  profiles,
  policies,
  phoneLines,
  ivrTree,
  kpis,
}: CommunicationsConsoleProps) {
  const [activeBrandKey, setActiveBrandKey] = useState<BrandKey>(
    profiles[0]?.key ?? "tolani-corp-hq",
  );
  const [activeChannelKey, setActiveChannelKey] = useState<ChannelKey>("voice");
  const [activeIvrDigit, setActiveIvrDigit] = useState(ivrTree[0]?.digit ?? "1");

  const activeBrand =
    profiles.find((profile) => profile.key === activeBrandKey) ?? profiles[0];
  const activePolicy =
    policies.find((policy) => policy.key === activeChannelKey) ?? policies[0];
  const activeIvrBranch =
    ivrTree.find((branch) => branch.digit === activeIvrDigit) ?? ivrTree[0];
  const activeLine = activeBrand
    ? matchingLineForBrand(phoneLines, activeBrand.key)
    : null;

  const channelCoverage = useMemo(
    () =>
      policies.map((policy) => ({
        policy,
        inbound: activeBrand?.primaryInboundChannels.includes(policy.key) ?? false,
        outbound: activeBrand?.primaryOutboundChannels.includes(policy.key) ?? false,
      })),
    [activeBrand, policies],
  );

  if (!activeBrand || !activePolicy || !activeIvrBranch) {
    return null;
  }

  return (
    <section
      id="network-console"
      className="border-y border-slate-800 bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <div className="px-2 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                Brand routing
              </p>
              <h2 className="mt-2 text-xl font-semibold">Network console</h2>
            </div>
            <div className="mt-3 grid gap-2">
              {profiles.map((profile) => {
                const isActive = profile.key === activeBrand.key;

                return (
                  <button
                    key={profile.key}
                    type="button"
                    onClick={() => setActiveBrandKey(profile.key)}
                    className={`rounded-lg border px-3 py-3 text-left transition ${
                      isActive
                        ? "border-tolani-gold bg-tolani-gold/12 text-white"
                        : "border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{profile.name}</span>
                    <span className="mt-1 block truncate text-xs text-white/45">
                      {profile.aiAgentLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-tolani-gold">
                      Active profile
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-normal">
                      {activeBrand.name}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68">
                      {activeBrand.mission}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      Assigned agent
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {activeBrand.aiAgentLabel}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Signal
                    label="Inbound"
                    value={String(activeBrand.primaryInboundChannels.length)}
                    detail={activeBrand.primaryInboundChannels
                      .map((channel) => channelLabels[channel])
                      .join(", ")}
                  />
                  <Signal
                    label="Outbound"
                    value={String(activeBrand.primaryOutboundChannels.length)}
                    detail={activeBrand.primaryOutboundChannels
                      .map((channel) => channelLabels[channel])
                      .join(", ")}
                  />
                  <Signal
                    label="Line status"
                    value={activeLine ? labelizeStatus(activeLine.status) : "planned"}
                    detail={activeLine?.display ?? "Dedicated brand line not assigned"}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  Switchboard simulator
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {ivrTree.map((branch) => (
                    <button
                      key={branch.digit}
                      type="button"
                      onClick={() => setActiveIvrDigit(branch.digit)}
                      className={`min-h-12 rounded-lg border text-sm font-semibold transition ${
                        branch.digit === activeIvrDigit
                          ? "border-tolani-gold bg-tolani-gold text-slate-950"
                          : "border-white/10 bg-black/25 text-white hover:bg-white/10"
                      }`}
                    >
                      {branch.digit}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    Press {activeIvrBranch.digit}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold">{activeIvrBranch.label}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    {activeIvrBranch.routeSummary}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                      Channel policy
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {channelLabels[activePolicy.key]}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {policies.map((policy) => (
                      <button
                        key={policy.key}
                        type="button"
                        onClick={() => setActiveChannelKey(policy.key)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                          policy.key === activePolicy.key
                            ? "border-tolani-gold bg-tolani-gold text-slate-950"
                            : "border-white/10 bg-black/20 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {channelLabels[policy.key]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  <PolicyTile label="Primary use" value={activePolicy.primaryUse} />
                  <PolicyTile label="Service level" value={activePolicy.serviceLevel} />
                  <PolicyTile label="System of record" value={activePolicy.systemOfRecord} />
                </div>

                <div className="mt-5 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                  {channelCoverage.map(({ policy, inbound, outbound }) => (
                    <div
                      key={policy.key}
                      className="rounded-lg border border-white/10 bg-black/25 p-3"
                    >
                      <p className="text-sm font-semibold">{channelLabels[policy.key]}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
                        <span
                          className={`rounded-lg border px-2 py-1 ${
                            inbound
                              ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-100"
                              : "border-white/10 bg-white/5 text-white/35"
                          }`}
                        >
                          Inbound
                        </span>
                        <span
                          className={`rounded-lg border px-2 py-1 ${
                            outbound
                              ? "border-sky-300/40 bg-sky-300/10 text-sky-100"
                              : "border-white/10 bg-white/5 text-white/35"
                          }`}
                        >
                          Outbound
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  Number posture
                </p>
                <div className="mt-4 space-y-3">
                  {phoneLines.map((line) => (
                    <div key={line.e164} className="rounded-lg border border-white/10 bg-black/25 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{line.friendlyName}</p>
                          <p className="mt-1 text-sm text-white/55">{line.display}</p>
                        </div>
                        <span
                          className={`rounded-lg border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[line.status]}`}
                        >
                          {labelizeStatus(line.status)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/62">
                        {line.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  Escalation design
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <MiniList title="Routing" items={activeBrand.supportRouting} />
                  <MiniList title="Escalation" items={activeBrand.escalationTargets} />
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
                  Operating KPIs
                </p>
                <div className="mt-4 grid gap-2">
                  {kpis.slice(0, 5).map((kpi) => (
                    <div
                      key={kpi}
                      className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/70"
                    >
                      {kpi}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Signal({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-5 text-white/58">{detail}</p>
    </div>
  );
}

function PolicyTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{value}</p>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-white/70">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
