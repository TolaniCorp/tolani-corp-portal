import Link from 'next/link'

import { Section, FadeIn } from '@/components/Section'
import {
  brandCommunicationProfiles,
  enterpriseChannelPolicies,
  enterprisePhoneLines,
} from '@/lib/enterpriseCommunicationNetwork'
import {
  platformNodes,
  signatureLoops,
  systemPlanes,
} from '@/lib/platformEngineeringAtlas'
import {
  portfolioMetrics,
  stakeholderBriefs,
  teamingEvents,
} from '@/lib/portfolioStrategy'

const surfaces = [
  {
    title: 'Portfolio Strategy',
    href: '/strategy',
    eyebrow: 'Business planning',
    description:
      'The commercial source of truth for monetization, profitability, backend sync priorities, and funding posture across the core platforms.',
    metrics: [
      `${portfolioMetrics.planCount} platform plans`,
      `${portfolioMetrics.revenueLaneCount} revenue lanes`,
      `${stakeholderBriefs.length} stakeholder tracks`,
    ],
  },
  {
    title: 'Platform Atlas',
    href: '/platform-engineering',
    eyebrow: 'Enterprise architecture',
    description:
      'A forward-looking map of the shared identity, memory, communications, commerce, and operator planes already emerging across the Tolani workspace.',
    metrics: [
      `${platformNodes.length} mapped platforms`,
      `${systemPlanes.length} system planes`,
      `${signatureLoops.length} signature loops`,
    ],
  },
  {
    title: 'Teaming Events',
    href: '/teaming-events',
    eyebrow: 'Partner and capital motion',
    description:
      'A repeatable event and partner playbook that turns demos, showcases, and stakeholder briefings into measurable follow-through.',
    metrics: [
      `${teamingEvents.length} event formats`,
      `${brandCommunicationProfiles.length} brand routes`,
      `${enterprisePhoneLines.length} managed lines`,
    ],
  },
  {
    title: 'Communications Network',
    href: '/communications',
    eyebrow: 'Enterprise routing',
    description:
      'A hybrid HQ-plus-brand communications model that turns voice, messaging, and operator routing into one governed support and lead system.',
    metrics: [
      `${brandCommunicationProfiles.length} brand profiles`,
      `${enterprisePhoneLines.length} managed lines`,
      `${enterpriseChannelPolicies.length} channel policies`,
    ],
  },
  {
    title: 'Portfolio Ecosystem',
    href: '/ecosystem',
    eyebrow: 'Brand surfaces',
    description:
      'The public brand layer remains distinct, but every surface can now plug into the same enterprise operating language underneath.',
    metrics: ['Education, travel, sports, logistics', 'One parent-company operating model', 'Built for expansion'],
  },
]

export function CommandSurfaces() {
  return (
    <Section
      id="command-surfaces"
      title="Command Surfaces"
      className="bg-[linear-gradient(180deg,#ffffff,#f8fafc_36%,#eef2ff_100%)]"
    >
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Built to be remembered</p>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          The workspace is no longer just a collection of products. It now has public entry points
          for strategy, platform architecture, teaming motion, communications, and brand discovery
          so partners can understand how the system works before they ever enter a product.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-5">
        {surfaces.map((surface) => (
          <FadeIn key={surface.title} className="h-full">
            <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-transform duration-200 hover:-translate-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                {surface.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">
                {surface.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{surface.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {surface.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href={surface.href}
                  className="inline-flex items-center rounded-full border border-slate-900 bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Open {surface.title}
                </Link>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
