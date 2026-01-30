import { Play } from "lucide-react";
import { defineField, defineType } from "sanity";

import { backgroundColorField } from "../common";

export const videoSection = defineType({
  name: "videoSection",
  type: "object",
  title: "Video Section",
  description: "A section with a video from Mux, title, and description",
  icon: Play,
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
      description: "The main title for the video section",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Additional context below the main title",
    }),
    defineField({
      name: "video",
      type: "mux.video",
      title: "Video",
      description: "Upload or select a video from Mux",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnailTime",
      type: "number",
      title: "Thumbnail timestamp (seconds)",
      description:
        "Use Mux's thumbnail API to choose a poster image by timestamp in seconds (e.g. 0, 1.5, 12). Leave empty to use the default poster.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "videoCaption",
      type: "string",
      title: "Video Caption",
      description: "Optional caption or description for the video",
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      title: "Aspect Ratio",
      description: "Choose the aspect ratio for the video player",
      options: {
        list: [
          { title: "16:9 (Widescreen)", value: "16/9" },
          { title: "4:3 (Standard)", value: "4/3" },
          { title: "1:1 (Square)", value: "1/1" },
          { title: "9:16 (Vertical)", value: "9/16" },
        ],
      },
      initialValue: "16/9",
    }),
    defineField({
      name: "autoplay",
      type: "boolean",
      title: "Autoplay",
      description: "Start playing the video automatically (muted)",
      initialValue: false,
    }),
    defineField({
      name: "loop",
      type: "boolean",
      title: "Loop",
      description: "Loop the video when it reaches the end",
      initialValue: false,
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
      video: "video",
    },
    prepare: ({ title, video }) => ({
      title: title ?? "Untitled Video Section",
      subtitle: video ? "Video configured" : "No video selected",
      media: Play,
    }),
  },
});
