#!/usr/bin/env node

// Seed Script — Populates Sanity with sample content
// Usage: node scripts/seed-data.mjs
// Requires PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, and SANITY_TOKEN in env

import { createClient } from "@sanity/client";

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error("Missing required env vars: PUBLIC_SANITY_PROJECT_ID, SANITY_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2026-02-01",
});

async function seed() {
  console.log(`\nSeeding ${dataset} in ${projectId}...\n`);

  // 1. Company Settings
  const settings = await client.createIfNotExists({
    _id: "companySettings",
    _type: "companySettings",
    businessName: "SMB",
    phone: "(555) 010-4827",
    email: "dispatch@premierservices.com",
    address: "1420 Forge Road, Riverside, CA 92501",
    serviceAreas: [
      "Riverside",
      "Corona",
      "Moreno Valley",
      "Jurupa Valley",
      "Eastvale",
      "Norco",
      "Perris",
      "Mira Loma",
      "Woodcrest",
      "Highgrove",
    ],
    licenseNumbers: ["CSLB #1098432", "Bonded & Insured"],
  });
  console.log(`  ✓ Company settings created`);

  // 2. Services
  const serviceData = [
    {
      title: "Emergency Services",
      description: "Burst pipes, major leaks, and emergencies — 24/7 rapid response when it can't wait.",
      bulletPoints: ["24/7 availability", "60-min average arrival", "Same licensed technicians"],
      sequenceNumber: 1,
    },
    {
      title: "Water Heaters",
      description: "Repair, replacement, and tankless upgrades. Hot water back the same day.",
      bulletPoints: ["Same-day service", "Tankless expertise", "All major brands"],
      sequenceNumber: 2,
    },
    {
      title: "Drain & Sewer",
      description: "Hydro-jetting, camera inspection, and clog clearing that actually lasts.",
      bulletPoints: ["Camera inspections", "Hydro-jetting", "Trenchless repair"],
      sequenceNumber: 3,
    },
    {
      title: "Heating & HVAC",
      description: "Furnace service, thermostat installs, and seasonal tune-ups to cut your bills.",
      bulletPoints: ["Seasonal tune-ups", "Smart thermostat setup", "Energy-efficient upgrades"],
      sequenceNumber: 4,
    },
    {
      title: "Repairs & Fixtures",
      description: "Faucets, toilets, garbage disposals, and the small fixes that keep adding up.",
      bulletPoints: ["Quality parts", "Same-day available", "Flat-rate pricing"],
      sequenceNumber: 5,
    },
    {
      title: "Repipe & Remodel",
      description: "Whole-home repipes and bathroom/kitchen rough-ins, on schedule and to code.",
      bulletPoints: ["Permit-ready work", "Project management", "Clean job sites"],
      sequenceNumber: 6,
    },
  ];

  for (const svc of serviceData) {
    await client.createIfNotExists({
      _id: `service-${svc.sequenceNumber}`,
      _type: "service",
      ...svc,
      slug: { _type: "slug", current: svc.title.toLowerCase().replace(/[&\s]+/g, "-") },
    });
  }
  console.log(`  ✓ ${serviceData.length} services created`);

  // 3. Before & After Entries
  const baData = [
    { title: "Water main replacement", description: "Corroded water main, replaced with copper." },
    { title: "Under-sink repair", description: "Leak repair with cabinet reorganization." },
    { title: "Tankless water heater", description: "Full tankless conversion with gas line upgrade." },
  ];

  for (let i = 0; i < baData.length; i++) {
    await client.createIfNotExists({
      _id: `beforeAfter-${i + 1}`,
      _type: "beforeAfter",
      ...baData[i],
    });
  }
  console.log(`  ✓ ${baData.length} before/after entries created`);

  console.log(`\n✓ Seed complete!`);
  console.log(`  Open http://localhost:4321/admin to view your content.\n`);
}

seed().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
