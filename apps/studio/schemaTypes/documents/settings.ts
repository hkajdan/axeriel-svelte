import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const socialLinks = defineField({
  name: "socialLinks",
  title: "Social Media Links",
  description: "Add links to your social media profiles",
  type: "object",
  options: {},
  fields: [
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      description: "Full URL to your LinkedIn profile/company page",
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: "Facebook URL",
      description: "Full URL to your Facebook profile/page",
      type: "string",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X URL",
      description: "Full URL to your Twitter/X profile",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      description: "Full URL to your Instagram profile",
      type: "string",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      description: "Full URL to your YouTube channel",
      type: "string",
    }),
  ],
});

export const settings = defineType({
  name: "settings",
  type: "document",
  title: "Settings",
  description: "Global settings and configuration for your website",
  icon: CogIcon,
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "label",
      type: "string",
      initialValue: "Settings",
      title: "Label",
      description: "Label used to identify settings in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
      description:
        "The main title of your website, used in browser tabs and SEO",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: "Site Description",
      description: "A brief description of your website for SEO purposes",
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Site Logo",
      description: "Upload your website logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "logoWhite",
      type: "image",
      title: "Site Logo (White)",
      description: "White version of the logo, used on dark backgrounds (e.g. footer)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: "Contact Email",
      description: "Primary contact email address for your website",
      validation: (rule) => rule.email(),
    }),
    socialLinks,
    defineField({
      name: "floatingButton",
      title: "Floating Button",
      description:
        "Configure the floating action button that appears on scroll",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Floating Button",
          type: "boolean",
          initialValue: false,
          description: "Show/hide the floating button on the website",
        }),
        defineField({
          name: "image",
          title: "Button Image",
          type: "image",
          description: "Image/icon for the floating button",
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "link",
          title: "Button Link",
          type: "customUrl",
          description: "Where the button should link to when clicked",
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "tooltip",
          title: "Tooltip Text",
          type: "string",
          description: "Text shown when hovering over the button",
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: "position",
          title: "Button Position",
          type: "string",
          description: "Where to position the button on screen",
          options: {
            list: [
              { title: "Bottom Right", value: "bottom-right" },
              { title: "Bottom Left", value: "bottom-left" },
            ],
          },
          initialValue: "bottom-right",
          hidden: ({ parent }) => !parent?.enabled,
        }),
      ],
    }),
    defineField({
      name: "contactPageFooter",
      title: "Contact Page Footer Override",
      description:
        "Optional override for the contact section displayed at the bottom of the Contact page.",
      type: "object",
      fields: [
        defineField({
          name: "overrideEnabled",
          title: "Enable Override",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "richText",
          title: "Rich Text",
          type: "richText",
          hidden: ({ parent }) => !parent?.overrideEnabled,
        }),
        defineField({
          name: "author",
          title: "Contact Author",
          type: "reference",
          to: [{ type: "author" }],
          hidden: ({ parent }) => !parent?.overrideEnabled,
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (rule) => rule.email(),
          hidden: ({ parent }) => !parent?.overrideEnabled,
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
          hidden: ({ parent }) => !parent?.overrideEnabled,
        }),
      ],
      preview: {
        select: { enabled: "overrideEnabled", email: "email", phone: "phone" },
        prepare: ({ enabled, email, phone }) => ({
          title: enabled
            ? "Contact Page Footer (Override Active)"
            : "Contact Page Footer (Disabled)",
          subtitle: enabled
            ? [email, phone].filter(Boolean).join(" • ") || "No details set"
            : "Not active",
        }),
      },
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Settings",
      media: CogIcon,
    }),
  },
});
