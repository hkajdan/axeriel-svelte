import { TimerIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { richTextField, backgroundColorField } from "../common";
import { de } from "@faker-js/faker";

export const timeline = defineType({
  name: "timeline",
  title: "Timeline",
  icon: TimerIcon,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: "Badge",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "date",
              title: "Date",
              type: "number",
            },
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            richTextField,
            {
              name: "image",
              title: "Image",
              type: "image",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "anchor",
      title: "Anchor",
      type: "string",
      description: "A unique identifier for linking directly to this block",
    }),
    backgroundColorField,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "Timeline Block",
    }),
  },
});
