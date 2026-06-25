import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  ""
);

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID ?? "your-project-id",
      dataset: PUBLIC_SANITY_DATASET ?? "production",
      useCdn: false,
      studioBasePath: "/admin",
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],

  },
});
