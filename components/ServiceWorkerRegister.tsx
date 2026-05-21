"use client";

import { useEffect } from "react";

type ServiceWorkerDetail = {
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

const serviceWorkerPath = "/sw.js";

function publishServiceWorkerState(detail: ServiceWorkerDetail) {
  window.dispatchEvent(new CustomEvent("tolani:service-worker", { detail }));
}

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      publishServiceWorkerState({
        supported: false,
        registered: false,
        controlled: false,
        status: "unsupported",
      });
      return;
    }

    const isSecureContext =
      window.location.protocol === "https:" ||
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (!isSecureContext) {
      publishServiceWorkerState({
        supported: true,
        registered: false,
        controlled: false,
        status: "secure-context-required",
      });
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type !== "TOLANI_SW_STATUS") return;

      publishServiceWorkerState({
        supported: true,
        registered: true,
        controlled: Boolean(navigator.serviceWorker.controller),
        status: event.data.payload?.status ?? "message",
        scope: event.data.payload?.scope,
        version: event.data.payload?.version,
        cacheName: event.data.payload?.cacheName,
        cachedRoutes: event.data.payload?.cachedRoutes,
      });
    };

    const handleControllerChange = () => {
      publishServiceWorkerState({
        supported: true,
        registered: true,
        controlled: Boolean(navigator.serviceWorker.controller),
        status: "controlling",
      });
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    navigator.serviceWorker
      .register(serviceWorkerPath, { scope: "/" })
      .then((registration) => {
        publishServiceWorkerState({
          supported: true,
          registered: true,
          controlled: Boolean(navigator.serviceWorker.controller),
          status: "registered",
          scope: registration.scope,
        });

        const activeWorker = registration.active ?? registration.waiting ?? registration.installing;
        activeWorker?.postMessage({ type: "GET_STATUS" });

        return navigator.serviceWorker.ready;
      })
      .then((registration) => {
        publishServiceWorkerState({
          supported: true,
          registered: true,
          controlled: Boolean(navigator.serviceWorker.controller),
          status: "ready",
          scope: registration.scope,
        });
        registration.active?.postMessage({ type: "GET_STATUS" });
      })
      .catch((error: Error) => {
        publishServiceWorkerState({
          supported: true,
          registered: false,
          controlled: false,
          status: "registration-error",
          error: error.message,
        });
      });

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  return null;
}
