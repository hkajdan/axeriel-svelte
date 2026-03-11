import { LayoutPanelLeft, Link, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";
import { buttonsField, richTextField } from "../common";

const footerColumnLink = defineField({
  name: "footerColumnLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the column",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      description: "Links for the column",
      of: [footerColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      title: "Subtitle",
      description: "Subtitle that sits beneath the logo in the footer",
    }),
    defineField({
      name: "download",
      type: "object",
      title: "Download (PDF)",
      description:
        "Optional downloadable PDF link displayed under the subtitle.",
      fields: [
        defineField({
          name: "file",
          type: "file",
          title: "PDF File",
          description:
            "Upload a PDF file to make it downloadable in the footer.",
          options: { accept: "application/pdf" },
          validation: (rule) =>
            rule.custom((value) => {
              if (value && value.asset && !value.asset._ref)
                return "Invalid file";
              return true;
            }),
        }),
        defineField({
          name: "label",
          type: "string",
          title: "Link Label",
          description: "Text shown for the download link.",
          initialValue: () => "Télécharger le PDF",
        }),
        defineField({
          name: "openInNewTab",
          type: "boolean",
          title: "Open in new tab",
          initialValue: () => true,
        }),
      ],
      preview: {
        select: { label: "label", file: "file.asset.originalFilename" },
        prepare: ({ label, file }) => ({
          title: label || "PDF Link",
          subtitle: file ? `📄 ${file}` : "No file",
        }),
      },
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      description: "Logo for the footer",
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer",
      of: [footerColumn],
    }),
    defineField({
      name: "contact",
      type: "object",
      title: "Contact",
      fields: [richTextField, buttonsField],
    }),
    defineField({
      name: "contactAuthor",
      type: "reference",
      title: "Contact Author",
      description:
        "The default contact person shown in the footer. Individual pages can override this.",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "location",
      type: "object",
      title: "Location",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
        }),

        defineField({
          name: "address",
          type: "string",
          title: "Address",
          description: "Address for the footer",
        }),
        defineField({
          name: "city",
          type: "string",
          title: "City",
          description: "Additional address information for the footer",
        }),
        defineField({
          name: "phone",
          type: "string",
          title: "Phone",
          description: "Phone number for the footer",
        }),
        defineField({
          name: "lat",
          type: "number",
          title: "Latitude",
          description: "Latitude for the map marker (ex: 45.18571)",
        }),
        defineField({
          name: "lng",
          type: "number",
          title: "Longitude",
          description: "Longitude for the map marker (ex: 5.80134)",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
