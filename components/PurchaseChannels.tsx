import Link from "next/link";

import { isExternalHref, resolveCommerceLink } from "@/lib/agentCommerce";
import type { PurchaseChannel } from "@/lib/portfolioStrategy";

type PurchaseChannelsSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  channels: PurchaseChannel[];
  tone?: "light" | "dark";
};

function statusClasses(status: PurchaseChannel["status"], tone: "light" | "dark") {
  if (tone === "dark") {
    switch (status) {
      case "live-now":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-100";
      case "operator-led":
        return "border-sky-400/20 bg-sky-400/10 text-sky-100";
      case "pilot":
        return "border-amber-400/20 bg-amber-400/10 text-amber-100";
      default:
        return "border-white/15 bg-white/10 text-white/80";
    }
  }

  switch (status) {
    case "live-now":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-700";
    case "operator-led":
      return "border-sky-500/20 bg-sky-500/10 text-sky-700";
    case "pilot":
      return "border-amber-500/20 bg-amber-500/10 text-amber-700";
    default:
      return "border-slate-300 bg-slate-100 text-slate-700";
  }
}

function statusLabel(status: PurchaseChannel["status"]) {
  switch (status) {
    case "live-now":
      return "Live now";
    case "operator-led":
      return "Operator led";
    case "pilot":
      return "Pilot lane";
    default:
      return "Private route";
  }
}

function ChannelAction({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: "light" | "dark";
}) {
  const className =
    tone === "dark"
      ? "inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
      : "inline-flex items-center rounded-full border border-slate-900 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800";

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function PurchaseChannelsSection({
  id,
  eyebrow = "Purchase channels",
  title,
  description,
  channels,
  tone = "light",
}: PurchaseChannelsSectionProps) {
  const sectionClasses =
    tone === "dark"
      ? "rounded-[2rem] border border-white/10 bg-slate-950 p-8 text-white shadow-sm"
      : "rounded-[2rem] border border-slate-200 bg-white p-8 text-slate-950 shadow-sm";
  const mutedText = tone === "dark" ? "text-white/70" : "text-slate-600";
  const cardClasses =
    tone === "dark"
      ? "rounded-3xl border border-white/10 bg-white/5 p-6"
      : "rounded-3xl border border-slate-200 bg-slate-50 p-6";
  const chipClasses =
    tone === "dark"
      ? "rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
      : "rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600";

  return (
    <section id={id} className={sectionClasses}>
      <div className="max-w-4xl">
        <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${tone === "dark" ? "text-white/55" : "text-slate-500"}`}>
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
        <p className={`mt-4 text-sm leading-7 ${mutedText}`}>{description}</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => {
          const action = resolveCommerceLink(
            channel.platformKey,
            channel.href,
            channel.ctaLabel,
          );

          return (
            <article key={channel.key} className={cardClasses}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${tone === "dark" ? "text-white/50" : "text-slate-500"}`}>
                    {channel.platformName}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{channel.label}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses(channel.status, tone)}`}>
                  {statusLabel(channel.status)}
                </span>
              </div>

              <p className={`mt-4 text-sm leading-7 ${mutedText}`}>{channel.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className={chipClasses}>{channel.route}</span>
                <span className={chipClasses}>{channel.buyer}</span>
                {action.isStripeCheckout ? (
                  <span className={chipClasses}>Stripe checkout</span>
                ) : null}
              </div>

              <div className={`mt-5 rounded-2xl border px-4 py-4 text-sm leading-6 ${tone === "dark" ? "border-white/10 bg-black/20 text-white/75" : "border-slate-200 bg-white text-slate-700"}`}>
                {channel.note}
              </div>

              <div className="mt-6">
                <ChannelAction href={action.href} label={action.ctaLabel} tone={tone} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
