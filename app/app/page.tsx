import Link from "next/link";

import { LiveAnnouncements } from "@/components/LiveAnnouncements";
import { getLiveAnnouncements } from "@/lib/live-announcements";

const appLinks = [
  {
    title: "Employee Portal",
    description: "Authentication, profile management, and team workflows.",
    href: "/employee-portal",
  },
  {
    title: "Portfolio Strategy",
    description: "Business logic, monetization lanes, and operating priorities.",
    href: "/strategy",
  },
  {
    title: "Platform Atlas",
    description: "Architecture planes and system map across the enterprise.",
    href: "/platform-engineering",
  },
  {
    title: "Communications",
    description: "HQ routing and partner communication surfaces.",
    href: "/communications",
  },
];

export default async function OperationsAppPage() {
  const announcements = await getLiveAnnouncements(6);

  return (
    <div className="bg-slate-50 px-6 pb-16 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Tolani operations app
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            One place for enterprise command surfaces
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            This app layer sits on top of the public website and centralizes the active
            workflow routes used by operators, staff, and leadership.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {appLinks.map((item) => (
            <article key={item.href} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center rounded-full border border-slate-900 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Open route <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          ))}
        </section>

        <LiveAnnouncements announcements={announcements} compact />
      </div>
    </div>
  );
}
