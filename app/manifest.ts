import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tolani Corp Portfolio Console",
    short_name: "Tolani Corp",
    description: "Portfolio command surface for Tolani Corp strategy, routes, and operations.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#c9a963",
    shortcuts: [
      {
        name: "Preview Workbench",
        short_name: "Preview",
        description: "Open the device-framed Tolani Corp production preview.",
        url: "/preview",
      },
      {
        name: "Operator Console",
        short_name: "Console",
        description: "Open the Tolani Corp portfolio command center.",
        url: "/#service-worker-console",
      },
    ],
    icons: [
      {
        src: "/assets/foundation/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/foundation/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
