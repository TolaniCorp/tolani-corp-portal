"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { PurchaseChannelStatus } from "@/lib/portfolioStrategy";

type PreviewRoute = {
  key: string;
  label: string;
  path: string;
  owner: string;
  description: string;
  status: PurchaseChannelStatus;
};

type PreviewMetric = {
  label: string;
  value: string;
  detail: string;
};

type PurchaseRoute = {
  key: string;
  platformName: string;
  route: string;
  href: string;
  status: PurchaseChannelStatus;
};

type TolaniSitePreviewProps = {
  hqLine: string;
  metrics: PreviewMetric[];
  purchaseRoutes: PurchaseRoute[];
  routes: PreviewRoute[];
};

type ViewportKey = "mobile" | "tablet" | "desktop";

const viewportOptions: Array<{
  key: ViewportKey;
  label: string;
  frameClassName: string;
  heightClassName: string;
}> = [
  {
    key: "mobile",
    label: "Mobile",
    frameClassName: "mx-auto w-full max-w-[390px]",
    heightClassName: "h-[720px]",
  },
  {
    key: "tablet",
    label: "Tablet",
    frameClassName: "mx-auto w-full max-w-[820px]",
    heightClassName: "h-[760px]",
  },
  {
    key: "desktop",
    label: "Desktop",
    frameClassName: "w-full",
    heightClassName: "h-[780px]",
  },
];

const statusLabel: Record<PurchaseChannelStatus, string> = {
  "live-now": "Live",
  "operator-led": "Operator led",
  pilot: "Pilot",
  private: "Private",
};

const statusClassName: Record<PurchaseChannelStatus, string> = {
  "live-now": "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  "operator-led": "border-sky-300/30 bg-sky-300/10 text-sky-100",
  pilot: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  private: "border-slate-300/20 bg-white/10 text-slate-200",
};

const IconPhone = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8.5 4.5 6 6.7c-.7.6-.9 1.6-.5 2.4 2 4.3 5.2 7.5 9.5 9.5.8.4 1.8.2 2.4-.5l2.1-2.5-3.3-3.2-2.1 1.8a12.5 12.5 0 0 1-4.4-4.4l1.8-2.1-3-3.2Z" />
  </svg>
);

const IconExternal = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m13 11 6-6" strokeLinecap="round" />
    <path d="M10.5 6H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3.5" />
  </svg>
);

const IconCache = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 7c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Z" />
    <path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
    <path d="M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
  </svg>
);

const IconDevice = ({ type }: { type: ViewportKey }) => {
  if (type === "mobile") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="8" y="3" width="8" height="18" rx="2" />
        <path d="M11 18h2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "tablet") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M11 17.5h2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="12" rx="1.8" />
      <path d="M9 20h6M12 16v4" strokeLinecap="round" />
    </svg>
  );
};

export function TolaniSitePreview({
  hqLine,
  metrics,
  purchaseRoutes,
  routes,
}: TolaniSitePreviewProps) {
  const [activeRouteKey, setActiveRouteKey] = useState(routes[0]?.key ?? "home");
  const [viewport, setViewport] = useState<ViewportKey>("desktop");
  const [frameReady, setFrameReady] = useState(false);
  const [serviceWorkerStatus, setServiceWorkerStatus] = useState("checking");
  const [lastCacheAction, setLastCacheAction] = useState("No route cached from this panel yet.");

  const selectedRoute = useMemo(
    () => routes.find((route) => route.key === activeRouteKey) ?? routes[0],
    [activeRouteKey, routes],
  );

  const selectedViewport = viewportOptions.find((option) => option.key === viewport) ?? viewportOptions[2];

  useEffect(() => {
    setFrameReady(false);
  }, [selectedRoute?.path, viewport]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      setServiceWorkerStatus("unsupported");
      return;
    }

    const handleServiceWorkerStatus = (event: Event) => {
      const detail = (event as CustomEvent<{ status?: string; registered?: boolean; controlled?: boolean }>).detail;
      if (!detail) return;

      if (detail.status) {
        setServiceWorkerStatus(detail.controlled ? `${detail.status} / controlling` : detail.status);
        return;
      }

      setServiceWorkerStatus(detail.registered ? "registered" : "not registered");
    };

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type !== "TOLANI_SW_STATUS") return;
      const payload = event.data.payload;
      setServiceWorkerStatus(payload?.status ?? "ready");
    };

    window.addEventListener("tolani:service-worker", handleServiceWorkerStatus);
    navigator.serviceWorker.addEventListener("message", handleServiceWorkerMessage);
    navigator.serviceWorker.ready
      .then((registration) => {
        setServiceWorkerStatus("ready");
        registration.active?.postMessage({ type: "GET_STATUS" });
      })
      .catch(() => setServiceWorkerStatus("not ready"));

    return () => {
      window.removeEventListener("tolani:service-worker", handleServiceWorkerStatus);
      navigator.serviceWorker.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, []);

  const primeSelectedRoute = async () => {
    if (!selectedRoute || !("serviceWorker" in navigator)) {
      setLastCacheAction("Service worker is unavailable in this browser.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      registration.active?.postMessage({ type: "CACHE_ROUTE", url: selectedRoute.path });
      setLastCacheAction(`Cache requested for ${selectedRoute.label}.`);
    } catch {
      setLastCacheAction("Cache request could not be sent.");
    }
  };

  if (!selectedRoute) {
    return null;
  }

  return (
    <div className="-mb-20 bg-slate-950 text-white">
      <section className="border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex h-12 w-40 items-center justify-center rounded-lg border border-white/10 bg-white px-3">
                <Image
                  src="/assets/brand/logo.svg"
                  alt="Tolani Corp"
                  width={190}
                  height={54}
                  className="h-8 w-auto"
                  priority
                />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-black tracking-normal text-white sm:text-xl">
                  Tolani Corp Preview
                </h1>
                <p className="mt-1 text-sm leading-6 text-white/60">
                  tolanicorp.us viewport workbench
                </p>
              </div>
            </div>
            <ul aria-label="Preview stack" className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-xs leading-6 text-white/50">
              {["Next.js", "Tailwind CSS", "Service Worker", "Portfolio OS", "Production routes"].map((item, index) => (
                <li key={item} className="flex gap-x-2">
                  <span>{item}</span>
                  {index < 4 ? <span className="text-white/20">/</span> : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-1 lg:flex">
            {viewportOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={viewport === option.key}
                onClick={() => setViewport(option.key)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  viewport === option.key
                    ? "bg-white text-slate-950"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <IconDevice type={option.key} />
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <div className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white/75">
              <IconPhone />
              {hqLine}
            </div>
            <a
              href={selectedRoute.path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-[#d7b76d]"
            >
              <IconExternal />
              Open full screen
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]">
          <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Route selector
            </p>
            <div className="mt-4 grid gap-2">
              {routes.map((route) => (
                <button
                  key={route.key}
                  type="button"
                  onClick={() => setActiveRouteKey(route.key)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    activeRouteKey === route.key
                      ? "border-[#d7b76d] bg-[#d7b76d]/10 text-white"
                      : "border-white/10 bg-black/10 text-white/70 hover:border-white/25 hover:text-white"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{route.label}</span>
                    <span className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClassName[route.status]}`}>
                      {statusLabel[route.status]}
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/50">{route.owner}</span>
                </button>
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-4 grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7b76d]">
                  Active frame
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-normal text-white sm:text-3xl">
                  {selectedRoute.label}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-white/60">
                  {selectedRoute.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <div className="flex rounded-lg border border-white/10 bg-black/20 p-1 lg:hidden">
                  {viewportOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      aria-pressed={viewport === option.key}
                      onClick={() => setViewport(option.key)}
                      className={`inline-flex min-h-9 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                        viewport === option.key ? "bg-white text-slate-950" : "text-white/70"
                      }`}
                    >
                      <IconDevice type={option.key} />
                      <span className="sr-only">{option.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={primeSelectedRoute}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#d7b76d] hover:text-[#ffe0a0]"
                >
                  <IconCache />
                  Prime preview cache
                </button>
              </div>
            </div>

            <div className="relative rounded-lg border border-white/10 bg-black/30 p-2 shadow-2xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-2 rounded-t-lg border-b border-white/10 bg-slate-900/95 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-2 truncate text-xs font-semibold text-white/50">
                  tolanicorp.us{selectedRoute.path}
                </span>
              </div>
              <div className={`${selectedViewport.frameClassName} pt-10 transition-[max-width,width] duration-300`}>
                <div className="relative overflow-hidden rounded-lg bg-white">
                  {!frameReady ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/90 text-sm font-semibold text-white/70">
                      Loading {selectedRoute.label}
                    </div>
                  ) : null}
                  <iframe
                    key={`${selectedRoute.key}-${viewport}`}
                    title={`Tolani Corp ${selectedRoute.label} preview`}
                    allow="clipboard-read; clipboard-write"
                    className={`${selectedViewport.heightClassName} w-full bg-white`}
                    src={selectedRoute.path}
                    onLoad={() => setFrameReady(true)}
                  />
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-4">
            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Production status
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Service worker</p>
                  <p className="mt-2 text-sm font-semibold text-white">{serviceWorkerStatus}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Preview cache</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">{lastCacheAction}</p>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Operating metrics
              </p>
              <div className="mt-4 grid gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{metric.label}</p>
                    <p className="mt-2 text-2xl font-black tracking-normal text-white">{metric.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/50">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Buyer routes
              </p>
              <div className="mt-4 grid gap-2">
                {purchaseRoutes.slice(0, 4).map((route) => (
                  <a
                    key={route.key}
                    href={route.href}
                    className="rounded-lg border border-white/10 bg-black/20 p-3 transition-colors hover:border-[#d7b76d] hover:text-[#ffe0a0]"
                  >
                    <span className="block text-sm font-semibold text-white">{route.platformName}</span>
                    <span className="mt-1 block text-xs leading-5 text-white/50">{route.route}</span>
                  </a>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
