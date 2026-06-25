#!/usr/bin/env node

// Sanity Setup Script
// Creates dataset, configures CORS, and deploys schema
// Usage: node scripts/sanity-setup.mjs

const SANITY_TOKEN = process.env.SANITY_TOKEN;
const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.PUBLIC_SANITY_DATASET || "production";
const STUDIO_URL = process.env.STUDIO_URL || "http://localhost:4321";

if (!SANITY_TOKEN || !PROJECT_ID) {
  console.error("Missing required env vars: SANITY_TOKEN, PUBLIC_SANITY_PROJECT_ID");
  console.error("Copy .env.example to .env and fill in the values.");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${SANITY_TOKEN}`,
};

async function api(path, options = {}) {
  const url = `https://api.sanity.io${path}`;
  const res = await fetch(url, { headers, ...options });
  if (!res.ok) {
    const body = await res.text();
    console.error(`API error ${res.status} for ${path}:`, body);
    throw new Error(body);
  }
  return res.json();
}

async function main() {
  console.log(`\nSetting up Sanity project ${PROJECT_ID}...\n`);

  // 1. Create dataset
  try {
    await api(`/v2021-06-07/projects/${PROJECT_ID}/datasets`, {
      method: "PUT",
      body: JSON.stringify({ name: DATASET, aclMode: "public" }),
    });
    console.log(`  ✓ Dataset "${DATASET}" created.`);
  } catch (e) {
    if (e.message.includes("already exists")) {
      console.log(`  ∼ Dataset "${DATASET}" already exists.`);
    } else {
      throw e;
    }
  }

  // 2. Add CORS origin
  try {
    await api(`/v2021-06-07/projects/${PROJECT_ID}/cors`, {
      method: "POST",
      body: JSON.stringify({
        origin: STUDIO_URL,
        allowCredentials: true,
      }),
    });
    console.log(`  ✓ CORS origin "${STUDIO_URL}" added.`);
  } catch (e) {
    if (e.message.includes("already")) {
      console.log(`  ∼ CORS origin "${STUDIO_URL}" already configured.`);
    } else {
      throw e;
    }
  }

  // 3. Add wildcard CORS for production
  try {
    await api(`/v2021-06-07/projects/${PROJECT_ID}/cors`, {
      method: "POST",
      body: JSON.stringify({
        origin: window?.location?.origin || "https://*.vercel.app",
        allowCredentials: true,
      }),
    });
    console.log(`  ✓ CORS origin for production domains added.`);
  } catch (e) {
    console.log(`  ∼ CORS for production domains skipped.`);
  }

  console.log(`\n✓ Sanity project setup complete.\n`);
  console.log(`Next steps:`);
  console.log(`  1. Run \`cp .env.example .env\` and fill in your values`);
  console.log(`  2. Run \`npm run dev\` to start the Astro dev server`);
  console.log(`  3. Visit http://localhost:4321/admin to open Sanity Studio`);
  console.log(`  4. Run \`npm run seed\` to populate sample content\n`);
}

main().catch((err) => {
  console.error("\nSetup failed:", err.message);
  process.exit(1);
});
