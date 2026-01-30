import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, richTextField, backgroundColorField } from "../common";
import { de } from "@faker-js/faker";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  icon: Star,
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
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "video",
      type: "mux.video",
      title: "Video",
    }),
    buttonsField,
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
      subtitle: "Hero Block",
    }),
  },
});
