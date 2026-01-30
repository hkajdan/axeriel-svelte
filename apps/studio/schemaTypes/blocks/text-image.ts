import { ImageIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { richTextField, backgroundColorField } from "../common";
import { media } from "sanity-plugin-media";

export const textImage = defineType({
  name: "textImage",
  title: "Text Image",
  icon: ImageIcon,
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    richTextField,
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            richTextField,
            {
              name: "image",
              title: "Image",
              type: "image",
            },
            defineField({
              name: "imagePosition",
              title: "Image Position",
              type: "string",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
          ],
          preview: {
            select: {
              imagePosition: "imagePosition",
              blocks: "richText",
              media: "image",
            },
            prepare(value) {
              const block = (value.blocks || []).find(
                (block: any) => block._type === "block",
              );
              return {
                media: value.media,
                title: block
                  ? `${block.children
                      .filter((child: any) => child._type === "span")
                      .map((span: any) => span.text)
                      .join("")} (image ${value.imagePosition})`
                  : `No title (image ${value.imagePosition})`,
              };
            },
          },
        },
      ],
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
      title,
      subtitle: "Text Image Block",
    }),
  },
});
