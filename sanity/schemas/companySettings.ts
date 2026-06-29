import { defineType, defineField } from "sanity";

export const companySettings = defineType({
  name: "companySettings",
  title: "Company Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      of: [{ type: "string" }],
      description: "Cities and regions served",
    }),
    defineField({
      name: "licenseNumbers",
      title: "License Numbers",
      type: "array",
      of: [{ type: "string" }],
      description: "Professional and business licenses",
    }),
    defineField({
      name: "logo",
      title: "Company Logo",
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
      name: "heroBackground",
      title: "Hero Background Image",
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
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "phone",
      media: "logo",
    },
  },
});
