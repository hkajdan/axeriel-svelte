import { defineField, defineType } from "sanity";

import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const allLinkableTypes = [
  { type: "blog" },
  { type: "blogIndex" },
  { type: "page" },
];

export const customUrl = defineType({
  name: "customUrl",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: createRadioListLayout(["internal", "external", "file"]),
      initialValue: () => "external",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      description: "If checked, the link will open in a new tab.",
      initialValue: () => false,
    }),
    defineField({
      name: "external",
      type: "string",
      title: "URL",
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "external") {
            if (!value) return "Url can't be empty";
            const isValid = isValidUrl(value);
            if (!isValid) return "Invalid URL";
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "href",
      type: "string",
      initialValue: () => "#",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "internal",
      type: "reference",
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.type !== "internal",
      to: allLinkableTypes,
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "internal" && !value?._ref)
            return "internal can't be empty";
          return true;
        }),
      ],
    }),
    defineField({
      name: "file",
      type: "file",
      title: "File (PDF)",
      description: "Upload a PDF file to link for download.",
      options: {
        accept: "application/pdf",
      },
      hidden: ({ parent }) => parent?.type !== "file",
      validation: (Rule) =>
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "file" && !value?.asset?._ref) return "File is required";
          return true;
        }),
    }),
    defineField({
      name: "anchor",
      type: "string",
      title: "Anchor",
      description: "Optional anchor link (e.g. #section1)",
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
  ],
  preview: {
    select: {
      externalUrl: "external",
      urlType: "type",
      internalUrl: "internal.slug.current",
      fileName: "file.asset->originalFilename",
      openInNewTab: "openInNewTab",
      anchor: "anchor",
    },
    prepare({
      externalUrl,
      urlType,
      internalUrl,
      fileName,
      openInNewTab,
      anchor,
    }) {
      const url =
        urlType === "external"
          ? externalUrl
          : urlType === "file"
            ? fileName
            : anchor
              ? `/${internalUrl} #${anchor}`
              : `/${internalUrl} `;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: `${urlType === "external" ? "External" : urlType === "file" ? "File" : "Internal"} Link`,
        subtitle: `${truncatedUrl}${newTabIndicator}`,
      };
    },
  },
});
