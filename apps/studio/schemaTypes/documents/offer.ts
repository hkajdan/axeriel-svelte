import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { defineSlug } from "../../utils/slug";

export const offer = defineType({
  name: "offer",
  title: "Offer",
  type: "document",
  icon: BillIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Job title for the offer, like 'Software Engineer'",
      validation: (Rule) => Rule.required().error("Job title is required"),
    }),

    defineSlug({
      name: "slug",
      title: "URL Slug",
      options: {
        source: "title",
      },
    }),

    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description:
        "A photo representing the job offer, like a team photo or office image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      title: "Summary",
      description: "Job summary that will appear in the list of offers",
    }),
    defineField({
      name: "description",
      type: "richText",
      title: "Description",
      description: "Job description that will appear next to their articles",
    }),
    defineField({
      name: "profile",
      type: "string",
      title: "Profile",
      description:
        "Profile of the ideal candidate, like 'Team player with 3+ years of experience'",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      description: "Type of job, like 'Full-time', 'Part-time', or 'Contract'",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "image",
    },
    prepare: ({ title, description, media }) => {
      // Create a playful subtitle with emojis
      const positionInfo = title ? `💼 ${title}` : "Mystery offer";
      const bioPreview = description
        ? `📝 ${description.substring(0, 20)}${description.length > 20 ? "..." : ""}`
        : "📝 No description yet";

      return {
        title: `✍️ ${title || "Unnamed Offer"}`,
        subtitle: `${positionInfo} | ${bioPreview}`,
        media,
      };
    },
  },
});
