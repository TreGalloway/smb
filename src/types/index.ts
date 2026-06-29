export interface SanityImage {
  _type: "image";
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: string;
  description?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  bulletPoints?: string[];
  sequenceNumber: number;
}

export interface BeforeAfter {
  _id: string;
  _type: "beforeAfter";
  title: string;
  service?: {
    _id: string;
    title: string;
    slug: string;
  };
  beforeImage?: SanityImage;
  afterImage?: SanityImage;
  description?: string;
}

export interface Review {
  _id: string;
  _type: "review";
  name: string;
  text: string;
  order?: number;
}

export interface TeamMember {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  photo?: SanityImage;
  bio?: string;
  order?: number;
}

export interface CompanySettings {
  _id: string;
  _type: "companySettings";
  businessName: string;
  phone: string;
  email?: string;
  address?: string;
  serviceAreas?: string[];
  licenseNumbers?: string[];
  logo?: SanityImage;
  heroBackground?: SanityImage;
}
