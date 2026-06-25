import { sanityClient } from "sanity:client";
import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "../types";

export const client = sanityClient;

export const urlFor = (source: SanityImage) => {
  return createImageUrlBuilder(client).image(source);
};
