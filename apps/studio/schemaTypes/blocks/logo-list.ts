import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagePlay } from "lucide-react";
import { richTextField, backgroundColorField } from "../common";

export const logoList = defineType({
  name: "logoList",
  title: "Logo list",
  icon: ImagePlay,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    richTextField,
    defineField({
      name: "logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              description: "The logo or icon to display",
            }),
            defineField({
              name: "text",
              type: "string",
            }),
            defineField({
              name: "url",
              type: "customUrl",
              title: "Link",
              description: "Optional link for when the logo is clicked",
            }),
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
      logos: "logos",
    },
    prepare: ({ title, logos }) => ({
      title: title || "Untitled Logo List",
      subtitle: "Logo List",
    }),
  },
});
