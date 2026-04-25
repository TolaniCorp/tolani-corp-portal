import Link from "next/link";
import { PurchaseChannelsSection } from "@/components/PurchaseChannels";

import {
  featuredPurchaseChannels,
  stakeholderBriefs,
  teamingEvents,
} from "../../lib/portfolioStrategy";

export default function TeamingEventsPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0f172a_0%,#111827_38%,#f8fafc_38%,#ffffff_100%)] text-slate-950">
      <section className="border-b border-white/10 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-5xl space-y-6">
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Teaming Events
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Turn the portfolio into a repeatable partner, capital, and operator motion.
            </h1>
            <p className="max-w-4xl text-lg leading-8 text-white/70">
              Teaming events are not generic showcases. They are structured operating moments that
              connect public narrative, proof assets, lead routing, and post-event execution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <DarkStat
              label="Event formats"
              value={String(teamingEvents.length)}
              detail="Structured around live products, operator proof, and follow-through."
            />
            <DarkStat
              label="Stakeholder tracks"
              value={String(stakeholderBriefs.length)}
              detail="Each event maps into an investor, operator, or partnership lane."
            />
            <DarkStat
              label="Operating rule"
              value="24h"
              detail="Every event should have a documented follow-up sequence within one business day."
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/strategy"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              Open portfolio strategy
            </Link>
            <Link
              href="/communications"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View communications network
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-6 py-14 lg:px-10">
        <Panel eyebrow="Operating method" title="A teaming event should create movement, not just attention">
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              "Use only proof that is already backed by the live backend or documented roadmap.",
              "Route attendees into the right product, partner, or funding lane before the event ends.",
              "Assign one owner for follow-up, one owner for proof assets, and one owner for CRM capture.",
              "Measure conversion, not applause: meetings booked, pilots opened, partners onboarded, revenue advanced.",
            ].map((principle) => (
              <div key={principle} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                {principle}
              </div>
            ))}
          </div>
        </Panel>

        <PurchaseChannelsSection
          id="purchase-channels"
          eyebrow="Post-event routing"
          title="Every event should terminate in a real purchase channel"
          description="Teaming motion only works when the room can be routed into a next step immediately after the event. These are the clearest current buy-now or operator-entry paths that should receive qualified follow-through."
          channels={featuredPurchaseChannels}
        />

        <Panel eyebrow="Event portfolio" title="Five event motions can cover capital, distribution, product, and operator alignment">
          <div className="space-y-6">
            {teamingEvents.map((event) => (
              <article key={event.name} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{event.host}</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{event.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{event.objective}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Audience</p>
                    <p className="mt-2">{event.audience}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Signature outcome</p>
                  <p className="mt-3 text-lg font-semibold text-white">{event.signatureOutcome}</p>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <InfoList title="Required assets" items={event.requiredAssets} />
                  <InfoList title="Follow-through" items={event.followThrough} />
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="Funding and partnership tie-in" title="Map every event into a stakeholder motion">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {stakeholderBriefs.map((brief) => (
              <article key={brief.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{brief.audience}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">{brief.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{brief.offer}</p>
                <ul className="mt-4 space-y-2">
                  {brief.proofPack.map((item) => (
                    <li key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                      {item}
                    </li>
                  ))}
                </ul>
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

function DarkStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/70">{detail}</p>
    </div>
  );
}

function InfoList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
