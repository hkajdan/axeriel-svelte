import { defineArrayMember, defineField, defineType } from "sanity";
import { TheaterIcon } from "lucide-react";
import { richTextField, backgroundColorField } from "../common";

export const carousel = defineType({
  name: "carousel",
  title: "Carousel",
  icon: TheaterIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    richTextField,
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              description: "The image to display",
            }),
            richTextField,
          ],
          preview: {
            select: {
              media: "image",
              text: "text",
            },
            prepare: ({ media, text }) => ({
              title: text,
              media: media,
            }),
          },
        }),
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
      images: "images",
    },
    prepare: ({ title, images }) => ({
      title: title || "Untitled Carousel",
      subtitle: "Carousel",
    }),
  },
});
