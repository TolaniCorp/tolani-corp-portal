import type { LiveAnnouncement } from "@/lib/live-announcements";

const priorityStyles: Record<LiveAnnouncement["priority"], string> = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-slate-200 bg-slate-50 text-slate-700",
};

function formatTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

export function LiveAnnouncements({
  announcements,
  compact = false,
}: {
  announcements: LiveAnnouncement[];
  compact?: boolean;
}) {
  if (!announcements.length) {
    return null;
  }

  const containerClass = compact
    ? "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    : "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm";

  return (
    <section className={containerClass}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Live updates
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Enterprise announcements
          </h2>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Dynamic feed
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {announcements.map((announcement) => (
          <article key={announcement.id} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${priorityStyles[announcement.priority]}`}
              >
                {announcement.priority}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {formatTimestamp(announcement.createdAt)}
              </span>
            </div>

            <h3 className="mt-3 text-base font-bold text-slate-950">{announcement.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{announcement.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
