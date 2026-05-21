"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlanStage, PurchaseChannelStatus } from "@/lib/portfolioStrategy";

type ConsoleRoute = {
  key: string;
  platformName: string;
  route: string;
  href: string;
  buyer: string;
  status: PurchaseChannelStatus;
};

type ConsolePlan = {
  key: string;
  name: string;
  domain: string;
  stage: PlanStage;
  ninetyDayMoves: string[];
};

type ConsoleEvent = {
  id: string;
  time: string;
  title: string;
  detail: string;
  status: "queued" | "active" | "done";
};

type QueueState = "triage" | "claimed" | "in-progress" | "ready" | "closed";

type QueueItem = {
  key: string;
  platformName: string;
  owner: string;
  state: QueueState;
  route: string;
};

type ServiceWorkerState = {
  supported: boolean;
  registered: boolean;
  controlled: boolean;
  status: string;
  scope?: string;
  version?: string;
  cacheName?: string;
  cachedRoutes?: string[];
  error?: string;
};

type TolaniOperatorConsoleProps = {
  activeLens: string;
  activeStage: "all" | PlanStage;
  activeRouteKey: string;
  routes: ConsoleRoute[];
  plans: ConsolePlan[];
  onSelectRoute: (routeKey: string) => void;
};

const ownerByStatus: Record<PurchaseChannelStatus, string> = {
  "live-now": "Revenue desk",
  "operator-led": "HQ operator",
  pilot: "Pilot ops",
  private: "Executive office",
};

const queueFlow: QueueState[] = ["triage", "claimed", "in-progress", "ready", "closed"];

const initialEvents: ConsoleEvent[] = [
  {
    id: "boot-route-map",
    time: "Boot",
    title: "Route map loaded",
    detail: "Portfolio plans, purchase channels, and HQ IVR branches are available to the console.",
    status: "done",
  },
  {
    id: "boot-service-worker",
    time: "Boot",
    title: "Service worker check started",
    detail: "The console is waiting for browser registration and cache status.",
    status: "active",
  },
];

function statusClass(status: PurchaseChannelStatus) {
  if (status === "live-now") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "operator-led") return "border-sky-200 bg-sky-50 text-sky-800";
  if (status === "pilot") return "border-amber-200 bg-amber-50 text-amber-800";
  return "border-slate-200 bg-slate-100 text-slate-700";
}

function queueClass(state: QueueState) {
  if (state === "closed") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (state === "ready") return "border-sky-200 bg-sky-50 text-sky-800";
  if (state === "in-progress") return "border-amber-200 bg-amber-50 text-amber-800";
  if (state === "claimed") return "border-indigo-200 bg-indigo-50 text-indigo-800";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function eventClass(status: ConsoleEvent["status"]) {
  if (status === "done") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "active") return "border-sky-200 bg-sky-50 text-sky-800";
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function isInternalRoute(href: string) {
  return href.startsWith("/");
}

export function TolaniOperatorConsole({
  activeLens,
  activeStage,
  activeRouteKey,
  routes,
  plans,
  onSelectRoute,
}: TolaniOperatorConsoleProps) {
  const [events, setEvents] = useState<ConsoleEvent[]>(initialEvents);
  const [serviceWorker, setServiceWorker] = useState<ServiceWorkerState>({
    supported: false,
    registered: false,
    controlled: false,
    status: "checking",
  });
  const [queue, setQueue] = useState<QueueItem[]>(() =>
    routes.map((route, index) => ({
      key: route.key,
      platformName: route.platformName,
      owner: ownerByStatus[route.status],
      state: index === 0 ? "claimed" : "triage",
      route: route.route,
    })),
  );

  const selectedRoute = routes.find((route) => route.key === activeRouteKey) ?? routes[0];
  const activePlan = useMemo(() => {
    if (!selectedRoute) return plans[0];
    return plans.find((plan) => selectedRoute.platformName.toLowerCase().includes(plan.name.toLowerCase().split(" ")[0])) ?? plans[0];
  }, [plans, selectedRoute]);

  useEffect(() => {
    const handleServiceWorkerState = (event: Event) => {
      const detail = (event as CustomEvent<ServiceWorkerState>).detail;
      setServiceWorker(detail);

      if (detail.status === "ready" || detail.status === "route-cached" || detail.status === "cache-cleared") {
        pushEvent("Service worker status updated", `Status: ${detail.status}`, detail.status === "ready" ? "active" : "done");
      }
    };

    window.addEventListener("tolani:service-worker", handleServiceWorkerState);

    if ("serviceWorker" in navigator) {
      setServiceWorker((current) => ({
        ...current,
        supported: true,
        controlled: Boolean(navigator.serviceWorker.controller),
      }));

      navigator.serviceWorker.ready
        .then((registration) => {
          setServiceWorker((current) => ({
            ...current,
            supported: true,
            registered: true,
            controlled: Boolean(navigator.serviceWorker.controller),
            status: "ready",
            scope: registration.scope,
          }));
          registration.active?.postMessage({ type: "GET_STATUS" });
        })
        .catch(() => {
          setServiceWorker((current) => ({ ...current, status: "registration-pending" }));
        });
    }

    return () => {
      window.removeEventListener("tolani:service-worker", handleServiceWorkerState);
    };
  }, []);

  function pushEvent(title: string, detail: string, status: ConsoleEvent["status"] = "queued") {
    setEvents((current) => [
      {
        id: `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${current.length}`,
        time: "Now",
        title,
        detail,
        status,
      },
      ...current,
    ].slice(0, 6));
  }

  async function postServiceWorkerMessage(message: Record<string, string>) {
    if (!("serviceWorker" in navigator)) {
      pushEvent("Service worker unavailable", "This browser does not expose service workers.", "queued");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const worker = registration.active ?? navigator.serviceWorker.controller;
    if (!worker) {
      pushEvent("Service worker pending", "Reload once so the active worker can control the page.", "queued");
      return;
    }

    worker.postMessage(message);
  }

  function advanceQueueItem(routeKey: string) {
    setQueue((current) =>
      current.map((item) => {
        if (item.key !== routeKey) return item;
        const nextIndex = Math.min(queueFlow.indexOf(item.state) + 1, queueFlow.length - 1);
        return { ...item, state: queueFlow[nextIndex] };
      }),
    );
    onSelectRoute(routeKey);
    pushEvent("Queue advanced", `${routes.find((route) => route.key === routeKey)?.platformName ?? "Route"} moved forward.`, "active");
  }

  function claimQueueItem(routeKey: string) {
    setQueue((current) =>
      current.map((item) => (item.key === routeKey ? { ...item, state: "claimed", owner: "HQ operator" } : item)),
    );
    onSelectRoute(routeKey);
    pushEvent("Route claimed", `${routes.find((route) => route.key === routeKey)?.platformName ?? "Route"} assigned to HQ operator.`, "active");
  }

  async function primeOfflineRoute() {
    const routeToCache = selectedRoute && isInternalRoute(selectedRoute.href) ? selectedRoute.href : "/";
    await postServiceWorkerMessage({ type: "CACHE_ROUTE", url: routeToCache });
    pushEvent("Offline route primed", `${routeToCache} was sent to the service-worker cache.`, "active");
  }

  async function clearServiceWorkerCache() {
    await postServiceWorkerMessage({ type: "CLEAR_TOLANI_CACHE" });
    pushEvent("Cache reset requested", "The service worker will rebuild the Tolani shell cache.", "queued");
  }

  function exportSnapshot() {
    const snapshot = {
      generatedAt: new Date().toISOString(),
      activeLens,
      activeStage,
      selectedRoute,
      activePlan,
      queue,
      serviceWorker,
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `tolani-console-${selectedRoute?.key ?? "snapshot"}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    pushEvent("Snapshot exported", "The current console state was downloaded as JSON.", "done");
  }

  return (
    <section id="operator-console" className="border-b border-slate-200 bg-white px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Service worker and console</p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">
              Operator controls are now part of the production surface.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              This panel registers the browser service worker, exposes cache status, queues route ownership, and exports a live
              operating snapshot for follow-up.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Service worker</p>
                <p className="mt-2 text-xl font-black tracking-normal text-slate-950">
                  {serviceWorker.registered ? "Registered" : serviceWorker.supported ? "Pending" : "Unsupported"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {serviceWorker.controlled ? "Controlling this page" : "Reload once after registration to control this page"}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cache status</p>
                <p className="mt-2 text-xl font-black tracking-normal text-slate-950">{serviceWorker.status}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{serviceWorker.cacheName ?? "Cache name will appear after activation"}</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Selected route</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-lg font-black text-slate-950">{selectedRoute?.platformName ?? "No route"}</span>
                {selectedRoute ? (
                  <span className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass(selectedRoute.status)}`}>
                    {selectedRoute.status.replace("-", " ")}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{selectedRoute?.buyer ?? "Select a route to inspect its operating owner."}</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={primeOfflineRoute}
                className="min-h-11 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Prime offline cache
              </button>
              <button
                type="button"
                onClick={exportSnapshot}
                className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
              >
                Export snapshot
              </button>
              <button
                type="button"
                onClick={clearServiceWorkerCache}
                className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
              >
                Clear SW cache
              </button>
              <a
                href={selectedRoute?.href ?? "/communications"}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:border-slate-950"
              >
                Open route
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Route queue</p>
                  <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">Open work board</h3>
                </div>
                <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {queue.length} routes
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {queue.map((item) => (
                  <article key={item.key} className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-slate-950">{item.platformName}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.route}</p>
                      </div>
                      <span className={`rounded-md border px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${queueClass(item.state)}`}>
                        {item.state}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {item.owner}
                      </span>
                      <button
                        type="button"
                        onClick={() => claimQueueItem(item.key)}
                        className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:border-slate-950"
                      >
                        Claim
                      </button>
                      <button
                        type="button"
                        onClick={() => advanceQueueItem(item.key)}
                        className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 hover:border-slate-950"
                      >
                        Advance
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Console event log</p>
                  <h3 className="mt-2 text-2xl font-black tracking-normal text-slate-950">Recent actions</h3>
                </div>
                <span className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Live local state
                </span>
              </div>
              <div className="mt-5 grid gap-3">
                {events.map((event) => (
                  <div key={event.id} className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[5rem_minmax(0,1fr)_7rem]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{event.time}</p>
                    <div>
                      <p className="text-sm font-black text-slate-950">{event.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{event.detail}</p>
                    </div>
                    <span className={`h-fit rounded-md border px-2 py-1 text-center text-[11px] font-semibold uppercase tracking-wide ${eventClass(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
