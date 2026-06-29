import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", auto: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "bulletPoints",
      title: "Bullet Points",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative Text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "sequenceNumber",
      title: "Sequence Number",
      type: "number",
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sequenceNumber",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `#${String(subtitle).padStart(2, "0")}` : "",
        media,
      };
    },
  },
});
