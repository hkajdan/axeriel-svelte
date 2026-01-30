import { defineField, defineType } from "sanity";
import { BarChart3 } from "lucide-react";
import { backgroundColorField } from "../common";

export const histogram = defineType({
  name: "histogram",
  title: "Histogram",
  type: "object",
  icon: BarChart3,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      title: "Subtitle",
    }),
    defineField({
      name: "bars",
      type: "array",
      title: "Bars",
      of: [
        defineField({
          name: "bar",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({
              name: "value",
              type: "number",
              title: "Value",
              validation: (rule) => [rule.required(), rule.min(0)],
            }),
            defineField({
              name: "color",
              type: "string",
              title: "Color (optional)",
              description: "Tailwind color class or hex (e.g. #1d4ed8)",
            }),
          ],
          preview: {
            select: { label: "label", value: "value" },
            prepare: ({ label, value }) => ({
              title: label || "Bar",
              subtitle: `${value ?? 0}`,
            }),
          },
        }),
      ],
      validation: (rule) => rule.min(1).error("Add at least one bar"),
    }),
    defineField({
      name: "maxValue",
      type: "number",
      title: "Max Value (optional)",
      description: "Leave empty to auto-calculate from highest bar value",
    }),
    defineField({
      name: "minValue",
      type: "number",
      title: "Min Value (optional)",
      description:
        "Lower bound for the Y axis (default 0). Use to zoom into a range.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "valueSuffix",
      type: "string",
      title: "Value Suffix",
      description: "Optional suffix appended to each value (e.g. %, M€, kWh)",
    }),
    defineField({
      name: "showValues",
      type: "boolean",
      title: "Show numerical values above bars",
      initialValue: true,
    }),
    defineField({
      name: "animationDuration",
      type: "number",
      title: "Animation Duration (ms)",
      initialValue: 1200,
      validation: (rule) => rule.min(100).max(10000),
    }),
    defineField({
      name: "anchor",
      type: "string",
      title: "Anchor",
    }),
    backgroundColorField,
  ],
  preview: {
    select: { title: "title", bars: "bars" },
    prepare: ({ title, bars = [] }) => ({
      title: title || "Histogram",
      subtitle: `${bars.length} bar${bars.length === 1 ? "" : "s"}`,
    }),
  },
});
