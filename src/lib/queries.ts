import { defineQuery } from "groq";

export const COMPANY_SETTINGS_QUERY = defineQuery(`
  *[_type == "companySettings"][0] {
    _id,
    businessName,
    phone,
    email,
    address,
    serviceAreas,
    licenseNumbers,
    logo {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    heroBackground {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    }
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(sequenceNumber asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    mainImage {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    gallery[] {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    bulletPoints,
    sequenceNumber
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    bio,
    order
  }
`);

export const BEFORE_AFTER_QUERY = defineQuery(`
  *[_type == "beforeAfter"] {
    _id,
    title,
    description,
    service-> { _id, title, "slug": slug.current },
    beforeImage {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    },
    afterImage {
      asset->{ _id, url, metadata { lqip, dimensions { width, height } } },
      alt,
      hotspot,
      crop
    }
  }
`);
