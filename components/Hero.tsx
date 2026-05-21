import Image from 'next/image'
import Link from 'next/link'

import { FadeIn } from '@/components/Section'
import { getPrimaryHqLine } from '@/lib/enterpriseCommunicationNetwork'
import { systemPlanes } from '@/lib/platformEngineeringAtlas'
import { portfolioMetrics } from '@/lib/portfolioStrategy'

export function Hero() {
  const hqLine = getPrimaryHqLine()

  return (
    <div className="relative isolate bg-[linear-gradient(180deg,#ffffff,#f8fafc_72%,#eef2ff)]">
      <div className="py-16 sm:py-24 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <FadeIn>
              <div className="max-w-2xl xl:text-left">
                <div className="mb-6 flex justify-center xl:justify-start">
                  <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
                    <Image
                      src="/assets/brand/logo.svg"
                      alt="Tolani Corp"
                      width={220}
                      height={62}
                      className="h-10 w-auto"
                      priority
                    />
                  </div>
                </div>
                <div className="mb-8 flex justify-center xl:justify-start">
                  <div className="relative rounded-lg border border-gray-900/10 bg-white/80 px-4 py-1.5 text-sm leading-6 text-gray-600 shadow-sm">
                    Strategy, profitability, and teaming command surfaces are now live.{' '}
                    <Link href="/strategy" className="font-semibold text-tolani-gold">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Open the plans <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

                <h1 className="text-4xl font-bold tracking-normal text-tolani-black sm:text-6xl">
                  A command layer for{' '}
                  <span className="text-tolani-gold">strategy, profitability, teaming, brands, and AI systems</span>
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Tolani Corp is shaping a portfolio where education, engineering, travel, sports,
                  logistics, governance, and communications operate like one intelligent system
                  underneath while each brand keeps its own front door. The newest public surfaces
                  make the strategy model and teaming network easy to discover up front.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4 xl:justify-start">
                  <Link
                    href="/strategy"
                    className="rounded-lg bg-tolani-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-tolani-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tolani-black"
                  >
                    Open Portfolio Strategy
                  </Link>
                  <Link
                    href="/platform-engineering"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-tolani-gold hover:text-tolani-gold"
                  >
                    Open Platform Atlas
                  </Link>
                  <Link
                    href="/teaming-events"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-tolani-gold hover:text-tolani-gold"
                  >
                    Open Teaming Events
                  </Link>
                  <Link
                    href="/app"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:border-tolani-gold hover:text-tolani-gold"
                  >
                    Open Operations App
                  </Link>
                  <Link href="/ecosystem" className="text-sm font-semibold leading-6 text-gray-900">
                    Explore brand ecosystem <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <Signal
                    label="Platform plans"
                    value={String(portfolioMetrics.planCount)}
                    detail="Each core project now has a business and execution plan"
                  />
                  <Signal
                    label="Revenue lanes"
                    value={String(portfolioMetrics.revenueLaneCount)}
                    detail="Named monetization paths tracked across the portfolio"
                  />
                  <Signal
                    label="System planes"
                    value={String(systemPlanes.length)}
                    detail="Identity, memory, communications, commerce, operator, research"
                  />
                </div>
              </div>
            </FadeIn>

            <div className="flow-root">
              <div className="-m-2 rounded-lg bg-slate-950 p-2 shadow-2xl ring-1 ring-inset ring-white/10 lg:-m-4 lg:p-4">
                <div className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,#050816,#0f172a_100%)] p-8 text-white">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                    <span>Enterprise operating model</span>
                    <span className="rounded-lg border border-white/15 px-3 py-1 text-white/80">
                      Dynamic portfolio UX
                    </span>
                  </div>

                  <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-tolani-gold">
                          Core thesis
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-normal">
                          Every product can feel distinct on the surface and unmistakably Tolani
                          underneath.
                        </h2>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <SurfaceCard
                          eyebrow="Commercial plans"
                          title="Strategy + profitability"
                          detail="Portfolio business plans, stakeholder summaries, and backend-sync priorities for every major platform."
                        />
                        <SurfaceCard
                          eyebrow="Learning and workstations"
                          title="Tolani Labs + DEBO"
                          detail="Student journeys, AI workstations, credential flows, and management visibility."
                        />
                        <SurfaceCard
                          eyebrow="Strategy and teaming"
                          title="Platform Atlas + communications"
                          detail="Strategy command, teaming-event routing, governed automation, and brand-specific operator lanes."
                        />
                        <SurfaceCard
                          eyebrow="Events and routing"
                          title="Teaming + communications"
                          detail="HQ routing, partner showcases, operator motions, and brand-specific follow-through."
                        />
                        <SurfaceCard
                          eyebrow="Consumer operations"
                          title="BettorsACE + Hook Travel"
                          detail="Dynamic post-signin UX, War Room operations, concierge routing, and high-trust service recovery."
                        />
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                            HQ Switchboard
                          </p>
                          <p className="mt-2 text-2xl font-black tracking-normal text-white">
                            {hqLine?.display ?? 'Enterprise line pending'}
                          </p>
                        </div>
                        <span className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                          Voice first
                        </span>
                      </div>

                      <div className="mt-6 space-y-4">
                        <RouteRow digit="1" label="Tolani Labs" detail="Admissions, DEBO, learner support" />
                        <RouteRow
                          digit="2"
                          label="Hook Travel"
                          detail="Concierge, itinerary changes, military routing"
                        />
                        <RouteRow
                          digit="4"
                          label="BettorsACE"
                          detail="War Room, Pro Picks, billing, payouts"
                        />
                        <RouteRow
                          digit="5"
                          label="TSG"
                          detail="Freight, sourcing, tariff and customs support"
                        />
                        <RouteRow
                          digit="0"
                          label="Operator"
                          detail="Executive exceptions and after-hours handoff"
                        />
                      </div>

                      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                          Why this matters
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/75">
                          A single communications and operator language makes the portfolio easier
                          to govern, easier to scale, and harder to forget.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Signal({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/80 px-4 py-4 text-left shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-black tracking-normal text-tolani-black">{value}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{detail}</p>
    </div>
  )
}

function SurfaceCard({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">{eyebrow}</p>
      <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/75">{detail}</p>
    </div>
  )
}

function RouteRow({
  digit,
  label,
  detail,
}: {
  digit: string
  label: string
  detail: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-black/20 px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-sm font-bold text-white">
        {digit}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm leading-6 text-white/65">{detail}</p>
      </div>
    </div>
  )
}
