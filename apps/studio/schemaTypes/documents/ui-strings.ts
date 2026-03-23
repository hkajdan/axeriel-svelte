import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const uiStrings = defineType({
  name: 'uiStrings',
  title: 'UI Strings',
  type: 'document',
  icon: FileText,
  description: 'Translatable UI labels and strings used across the website',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'allOffers',
      type: 'string',
      title: 'All Offers',
      description: 'Back link text on job offer pages (e.g. "Toutes les offres")',
    }),
    defineField({
      name: 'applyByEmail',
      type: 'string',
      title: 'Apply by Email',
      description: 'CTA button on job offer pages (e.g. "Postuler par email")',
    }),
    defineField({
      name: 'applicationSubject',
      type: 'string',
      title: 'Application Email Subject Prefix',
      description: 'Email subject prefix for job applications (e.g. "Candidature - ")',
    }),
    defineField({
      name: 'learnMore',
      type: 'string',
      title: 'Learn More',
      description: 'Link text on job offer cards (e.g. "En savoir plus →")',
    }),
    defineField({
      name: 'noJobOffers',
      type: 'string',
      title: 'No Job Offers',
      description: 'Title when no job offers are available',
    }),
    defineField({
      name: 'noJobOffersDescription',
      type: 'string',
      title: 'No Job Offers Description',
      description: 'Description text when no job offers are available',
    }),
    defineField({
      name: 'ourExpert',
      type: 'string',
      title: 'Our Expert',
      description: 'Fallback label for contact person in footer (e.g. "Notre expert")',
    }),
    defineField({
      name: 'contact',
      type: 'string',
      title: 'Contact',
      description: 'Contact button text in mobile menu',
    }),
    defineField({
      name: 'allRightsReserved',
      type: 'string',
      title: 'All Rights Reserved',
      description: 'Copyright notice in footer (e.g. "Tous droits réservés")',
    }),
    defineField({
      name: 'toggleMenu',
      type: 'string',
      title: 'Toggle Menu',
      description: 'Aria label for mobile menu toggle button',
    }),
    defineField({
      name: 'closeMenu',
      type: 'string',
      title: 'Close Menu',
      description: 'Aria label for mobile menu close button/overlay',
    }),
  ],
  preview: {
    select: {
      language: 'language',
    },
    prepare({ language }) {
      return {
        title: 'UI Strings',
        subtitle: language ? `Language: ${language}` : 'No language set',
      }
    },
  },
})
