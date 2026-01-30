import { Mail } from "lucide-react";
import { defineField, defineType } from "sanity";

import { backgroundColorField } from "../common";

import { customRichText } from "../definitions/rich-text";

export const subscribeNewsletter = defineType({
  name: "subscribeNewsletter",
  title: "Subscribe Newsletter",
  type: "object",
  icon: Mail,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    customRichText(["block"], {
      name: "subTitle",
      title: "SubTitle",
    }),
    customRichText(["block"], {
      name: "helperText",
      title: "Helper Text",
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
      title: title ?? "Untitled",
      subtitle: "Subscribe Newsletter",
    }),
  },
});
