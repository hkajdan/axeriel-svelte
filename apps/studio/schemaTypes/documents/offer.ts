import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { defineSlug, isUnique } from "../../utils/slug";

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Job title for the offer, like 'Software Engineer'",
      validation: (Rule) => Rule.required().error("Job title is required"),
    }),

    defineField({
      name: "slug",
      type: "slug",
      title: "URL Slug",
      options: {
        source: "title",
        isUnique,
      },
      validation: (Rule) =>
        Rule.required()
          .error("A URL slug is required for the offer")
          .custom((slug) => {
            if (slug?.current === "en" || slug?.current === "/en") {
              return '"en" is reserved for the English language prefix and cannot be used as an offer slug';
            }
            return true;
          }),
    }),

    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "A photo representing the job offer, like a team photo or office image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      description: "Job summary that will appear in the list of offers",
    }),
    defineField({
      name: "description",
      type: "richText",
      title: "Description",
      description: "Job description that will appear next to their articles",
    }),
    defineField({
      name: "profile",
      type: "string",
      title: "Profile",
      description:
        "Profile of the ideal candidate, like 'Team player with 3+ years of experience'",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      description: "Type of job, like 'Full-time', 'Part-time', or 'Contract'",
    }),
  ],
  preview: {
    select: {
      title: "title",
      summary: "summary",
      media: "image",
    },
    prepare: ({ title, summary, media }) => ({
      title: title || "Unnamed Offer",
      subtitle: summary || "No summary yet",
      media,
    }),
  },
});
