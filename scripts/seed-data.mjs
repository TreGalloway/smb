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
      title: "Painting",
      description: "Interior and exterior painting — smooth, durable finishes that transform any space.",
      bulletPoints: ["Interior & exterior", "Color consultation", "Premium materials"],
      sequenceNumber: 1,
    },
    {
      title: "Pressure Washing",
      description: "Driveways, decks, siding, and more — restore your property's curb appeal.",
      bulletPoints: ["Driveways & walkways", "Decks & patios", "House siding"],
      sequenceNumber: 2,
    },
    {
      title: "Sheetrock",
      description: "Drywall installation, repair, and finishing for a seamless look.",
      bulletPoints: ["New installation", "Patch & repair", "Texture matching"],
      sequenceNumber: 3,
    },
    {
      title: "Trash Hauling",
      description: "Fast, affordable junk removal for homes and job sites.",
      bulletPoints: ["Same-day available", "Eco-friendly disposal", "No hidden fees"],
      sequenceNumber: 4,
    },
    {
      title: "Plumbing",
      description: "From drips to full repipes — licensed plumbers you can count on.",
      bulletPoints: ["Leak repairs", "Drain cleaning", "Fixture installation"],
      sequenceNumber: 5,
    },
    {
      title: "Lawn Care",
      description: "Mowing, trimming, and seasonal maintenance to keep your yard looking its best.",
      bulletPoints: ["Weekly mowing", "Edging & trimming", "Seasonal cleanup"],
      sequenceNumber: 6,
    },
    {
      title: "Light Electric",
      description: "Outlets, switches, lighting, and small electrical work — done right.",
      bulletPoints: ["Outlet & switch repair", "Lighting installation", "Panel upgrades"],
      sequenceNumber: 7,
    },
    {
      title: "House Cleaning",
      description: "Deep cleaning and regular maintenance for a spotless home.",
      bulletPoints: ["Deep cleaning", "Move-in/out", "Recurring schedules"],
      sequenceNumber: 8,
    },
    {
      title: "Carpentry",
      description: "Custom trim, shelves, doors, and framing — precision work every time.",
      bulletPoints: ["Custom built-ins", "Trim & molding", "Door installation"],
      sequenceNumber: 9,
    },
    {
      title: "Appliances",
      description: "Installation and repair for major home appliances.",
      bulletPoints: ["Installation", "Diagnostics & repair", "All major brands"],
      sequenceNumber: 10,
    },
    {
      title: "TV Wall Installations",
      description: "Mount your TV cleanly and securely — with hidden cable management.",
      bulletPoints: ["All mount types", "Cable hiding", "Stud-finder guarantee"],
      sequenceNumber: 11,
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

  // 3. Team Members
  const teamData = [
    { name: "Alex Reyes", role: "Owner & Lead Technician", bio: "20+ years in home services. Licensed, bonded, and committed to quality.", order: 1 },
    { name: "Jordan Chen", role: "Project Manager", bio: "Keeps every job on schedule and on budget.", order: 2 },
    { name: "Marcus Webb", role: "Senior Technician", bio: "Specializes in carpentry, drywall, and finish work.", order: 3 },
  ];

  for (const member of teamData) {
    await client.createIfNotExists({
      _id: `teamMember-${member.order}`,
      _type: "teamMember",
      ...member,
    });
  }
  console.log(`  ✓ ${teamData.length} team members created`);

  // 4. Before & After Entries
  const baData = [
    { title: "Living room refresh", description: "Full interior repaint with accent wall.", serviceRef: "service-1" },
    { title: "Driveway restoration", description: "Heavy-duty pressure washing on concrete driveway.", serviceRef: "service-2" },
    { title: "Bathroom sheetrock repair", description: "Water-damaged drywall replaced and refinished.", serviceRef: "service-3" },
    { title: "Kitchen sink replacement", description: "Old faucet and supply lines replaced with modern fixtures.", serviceRef: "service-5" },
    { title: "Backyard cleanup", description: "Overgrown lot cleared and graded.", serviceRef: "service-6" },
    { title: "Ceiling fan install", description: "New ceiling fan with light kit and dimmer switch.", serviceRef: "service-7" },
    { title: "Custom bookshelves", description: "Built-in floor-to-ceiling shelving with crown molding.", serviceRef: "service-9" },
    { title: "Dishwasher installation", description: "New dishwasher with proper drainage and leveling.", serviceRef: "service-10" },
    { title: "65\" TV mount", description: "Flush mount with in-wall cable management.", serviceRef: "service-11" },
  ];

  for (let i = 0; i < baData.length; i++) {
    await client.createIfNotExists({
      _id: `beforeAfter-${i + 1}`,
      _type: "beforeAfter",
      title: baData[i].title,
      description: baData[i].description,
      service: { _type: "reference", _ref: baData[i].serviceRef },
    });
  }
  console.log(`  ✓ ${baData.length} before/after entries created`);

  // 5. Reviews
  const reviewData = [
    { name: "Sarah M.", text: "They painted our entire living room in one day and it looks amazing. Professional, clean, and fair priced.", order: 1 },
    { name: "David L.", text: "Had a leaky pipe that three other plumbers couldn't fix. These guys found and repaired it in under two hours. Lifesavers.", order: 2 },
    { name: "Maria G.", text: "Our backyard was a mess after construction. They hauled everything away in one trip. Fast and affordable.", order: 3 },
    { name: "Tom K.", text: "Mounted our 75-inch TV with perfect cable concealment. Looks like a custom install. Highly recommend.", order: 4 },
    { name: "Lisa R.", text: "Sheetrock repair after a water leak — you can't even tell there was damage. Flawless finish.", order: 5 },
  ];

  for (const r of reviewData) {
    await client.createIfNotExists({
      _id: `review-${r.order}`,
      _type: "review",
      ...r,
    });
  }
  console.log(`  ✓ ${reviewData.length} reviews created`);

  console.log(`\n✓ Seed complete!`);
  console.log(`  Open http://localhost:4321/admin to view your content.\n`);
}

seed().catch((err) => {
  console.error("\nSeed failed:", err.message);
  process.exit(1);
});
