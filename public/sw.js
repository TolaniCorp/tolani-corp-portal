const VERSION = "tolani-corp-console-v1";
const CACHE_NAME = `tolani-corp-${VERSION}`;
const APP_SHELL = [
  "/",
  "/communications",
  "/strategy",
  "/app",
  "/offline.html",
  "/assets/brand/logo.svg",
  "/assets/labs/logo.svg",
  "/assets/tccg/logo-transparent.svg",
  "/assets/hooktravel/logo.svg",
  "/assets/tut/logo.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
];

function isSameOrigin(request) {
  return new URL(request.url).origin === self.location.origin;
}

async function cacheRequest(cache, request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return null;
  }
}

async function postStatus(client, status) {
  if (!client) return;
  const cache = await caches.open(CACHE_NAME);
  const cachedRequests = await cache.keys();

  client.postMessage({
    type: "TOLANI_SW_STATUS",
    payload: {
      status,
      version: VERSION,
      cacheName: CACHE_NAME,
      scope: self.registration.scope,
      cachedRoutes: cachedRequests.map((request) => new URL(request.url).pathname),
    },
  });
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => Promise.all(APP_SHELL.map((path) => cacheRequest(cache, path))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("tolani-corp-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const source = event.source;
  const payload = event.data ?? {};

  if (payload.type === "GET_STATUS") {
    event.waitUntil(postStatus(source, "ready"));
    return;
  }

  if (payload.type === "CACHE_ROUTE") {
    event.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cacheRequest(cache, payload.url || "/"))
        .then(() => postStatus(source, "route-cached")),
    );
    return;
  }

  if (payload.type === "CLEAR_TOLANI_CACHE") {
    event.waitUntil(caches.delete(CACHE_NAME).then(() => postStatus(source, "cache-cleared")));
  }
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || !isSameOrigin(request)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          const cachedHome = await caches.match("/");
          if (cachedHome) return cachedHome;

          return caches.match("/offline.html");
        }),
    );
    return;
  }

  const url = new URL(request.url);
  const cacheFirst =
    url.pathname.startsWith("/_next/static/") ||
    ["font", "image", "script", "style"].includes(request.destination) ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".ico");

  if (cacheFirst) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        });
      }),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
