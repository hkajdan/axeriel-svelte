import { Briefcase } from "lucide-react";
import { defineField, defineType } from "sanity";

import { richTextField, backgroundColorField } from "../common";

export const jobOffers = defineType({
  name: "jobOffers",
  type: "object",
  icon: Briefcase,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description:
        "The smaller text that sits above the title to provide context",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main heading for the job offers section",
    }),
    richTextField,
    backgroundColorField,
    defineField({
      name: "anchor",
      title: "Anchor",
      type: "string",
      description: "A unique identifier for linking directly to this block",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Job Offers Section",
    }),
  },
});
