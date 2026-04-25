import Image from 'next/image'
import Link from 'next/link'

import { Section, FadeIn } from '@/components/Section'

const companies = [
  {
    name: 'TC Construction Group',
    role: 'Infrastructure and HVAC',
    description:
      'Smart HVAC installations and ESG-compliant construction services building the physical foundation of the enterprise.',
      href: 'https://tccg.work',
    logo: '/assets/tccg/logo-transparent.svg',
  },
  {
    name: 'Tolani Labs',
    role: 'Innovation and education',
    description:
      'The R&D engine and learner ecosystem, now positioned around DEBO, credentials, and management visibility.',
    href: 'https://tolanilabs.io',
    logo: '/assets/labs/logo.svg',
  },
  {
    name: 'Tolani Ecosystem DAO',
    role: 'Governance and treasury',
    description:
      'The future governance and incentive layer for TUT once the operating products are stable, measured, and trusted.',
    href: 'https://tuttoken.pw',
    logo: '/assets/tut/logo.svg',
  },
  {
    name: 'Hook Travel',
    role: 'Consumer concierge',
    description:
      'A high-trust travel experience for military and mainstream customers with AI-first routing and human recovery.',
    href: 'https://hooktravel.app',
    logo: '/assets/hooktravel/logo.svg',
  },
]

export function Portfolio() {
  return (
    <Section title="Our Ecosystem" invert>
      <div className="mb-12 max-w-3xl">
        <p className="text-lg leading-8 text-white/70">
          Each company has a distinct operating role. The enterprise advantage comes from making
          identity, communication, orchestration, and oversight feel coherent across all of them.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
        {companies.map((company) => (
          <FadeIn
            key={company.name}
            className="flex flex-col rounded-[2rem] border border-white/10 p-8 transition-colors hover:bg-white/5"
          >
            <div className="flex items-center gap-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white px-3 py-3 shadow-sm">
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-8 tracking-tight text-white">
                  {company.name}
                </h3>
                <p className="font-mono text-sm text-tolani-gold">{company.role}</p>
              </div>
            </div>
            <p className="mt-4 text-base leading-7 text-gray-300">{company.description}</p>
            <div className="mt-6">
              <Link
                href={company.href}
                className="text-sm font-semibold leading-6 text-white hover:text-tolani-gold"
              >
                Visit surface <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  )
}
