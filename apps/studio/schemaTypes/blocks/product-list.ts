import { Package } from "lucide-react";
import { defineField, defineType } from "sanity";

import { backgroundColorField } from "../common";

export const productList = defineType({
  name: "productList",
  type: "object",
  icon: Package,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      title: "Eyebrow",
      description:
        "The smaller text that sits above the title to provide context",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The large text that is the primary focus of the block",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Additional context below the main title",
    }),
    defineField({
      name: "products",
      type: "array",
      title: "Products",
      description: "Select the products to display in this list",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => [Rule.required(), Rule.unique()],
    }),
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
      title: title ?? "Untitled",
      subtitle: "Product List",
    }),
  },
});
