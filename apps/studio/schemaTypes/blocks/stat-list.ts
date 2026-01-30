import { defineArrayMember, defineField, defineType } from "sanity";
import { ChartAreaIcon } from "lucide-react";
import { richTextField, textAlignField, backgroundColorField } from "../common";

export const statList = defineType({
  name: "statList",
  title: "Stat list",
  icon: ChartAreaIcon,
  type: "object",
  groups: [{ name: "content" }, { name: "options" }],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
    }),
    richTextField,
    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fieldsets: [{ name: "stat", options: { columns: 3 } }],
          fields: [
            defineField({
              name: "prefix",
              type: "string",
              fieldset: "stat",
            }),
            defineField({
              name: "value",
              type: "string",
              fieldset: "stat",
            }),
            defineField({
              name: "suffix",
              type: "string",
              fieldset: "stat",
            }),
            defineField({
              name: "text",
              type: "string",
            }),
          ],
          preview: {
            select: {
              prefix: "prefix",
              value: "value",
              suffix: "suffix",
              subtitle: "text",
            },
            prepare: ({ prefix, value, suffix, subtitle }) => ({
              title: [prefix, value, suffix].filter(Boolean).join(" "),
              subtitle,
            }),
          },
        }),
      ],
      group: "content",
    }),
    defineField(textAlignField),
    defineField({
      name: "animateNumbers",
      title: "Animate Numbers",
      type: "boolean",
      description: "Enable counter animation for stat numbers when they come into view",
      initialValue: true,
      group: "options",
    }),
    defineField({
      name: "animationDuration",
      title: "Animation Duration (seconds)",
      type: "number",
      description: "How long the counter animation should take",
      initialValue: 2,
      validation: (Rule) => Rule.min(0.5).max(10),
      group: "options",
      hidden: ({ parent }) => !parent?.animateNumbers,
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
      intro: "intro",
      stats: "stats",
    },
    prepare: ({ intro, stats }) => ({
      title: "intro",
      subtitle: "Stat list",
    }),
  },
});
