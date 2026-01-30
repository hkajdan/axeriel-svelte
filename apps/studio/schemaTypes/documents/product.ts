import { Package } from "lucide-react";
import { defineField, defineType } from "sanity";

import { parseRichTextToString } from "../../utils/helper";
import { richTextField } from "../common";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  description:
    "A product with title, description, and image that can be displayed in an expandable list format.",
  icon: Package,
  fields: [
    defineField({
      name: "title",
      title: "Product Title",
      type: "string",
      description: "The name or title of the product",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richTextField,
      title: "Description",
      description:
        "A detailed description of the product that will be shown when expanded.",
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      description:
        "Images representing the product (first image will be used as the main one)",
      of: [
        {
          type: "object",
          name: "productImage",
          title: "Product Image",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                  description: "Important for SEO and accessibility.",
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              ...richTextField,
              name: "caption",
              title: "Caption / Text",
              description:
                "Texte ou description affiché(e) avec cette slide dans le carousel.",
            }),
          ],
          preview: {
            select: { image: "image", caption: "caption" },
            prepare: ({ image, caption }) => ({
              title: caption ? parseRichTextToString(caption, 10) : "Slide",
              media: image,
            }),
          },
        },
      ],
      validation: (Rule) =>
        Rule.min(1).max(10).error("You can add between 1 and 10 images"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      richText: "richText",
      images: "images",
    },
    prepare: ({ title, richText, images }) => {
      const subtitle = `${parseRichTextToString(richText, 20)}`;

      return {
        title: `📦 ${title || "Untitled Product"}`,
        subtitle,
        media: images && images.length > 0 ? images[0] : null,
      };
    },
  },
});
