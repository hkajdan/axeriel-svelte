import { defineQuery } from '@sanity/sveltekit'

export const pageQuery = defineQuery(`*[_type == "page"] | order(_createdAt asc)[0]{
  title,
  slug,
  pageBuilder[]{
    _type,
    _key,
    _type == "hero" => {
      "type": "hero",
      ...@
    },
    _type == "cta" => {
      "type": "cta",
      ...@
    },
    _type == "featureCardsIcon" => {
      "type": "featureCardsIcon",
      ...@
    },
    _type == "productList" => {
      "type": "productList",
      ...@
    },
    _type == "imageLinkCards" => {
      "type": "imageLinkCards",
      ...@
    },
    _type == "subscribeNewsletter" => {
      "type": "subscribeNewsletter",
      ...@
    },
    _type == "statList" => {
      "type": "statList",
      ...@
    },
    _type == "logoList" => {
      "type": "logoList",
      ...@
    },
    _type == "timeline" => {
      "type": "timeline",
      ...@
    },
    _type == "textImage" => {
      "type": "textImage",
      ...@
    },
    _type == "carousel" => {
      "type": "carousel",
      ...@
    },
    _type == "jobOffers" => {
      "type": "jobOffers",
      ...@
    },
    _type == "videoSection" => {
      "type": "videoSection",
      ...@
    },
    _type == "histogram" => {
      "type": "histogram",
      ...@
    }
  }
}`)

export const pageBySlugQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  pageBuilder[]{
    _type,
    _key,
    _type == "hero" => {
      "type": "hero",
      ...@
    },
    _type == "cta" => {
      "type": "cta",
      ...@
    },
    _type == "featureCardsIcon" => {
      "type": "featureCardsIcon",
      ...@
    },
    _type == "productList" => {
      "type": "productList",
      ...@
    },
    _type == "imageLinkCards" => {
      "type": "imageLinkCards",
      ...@
    },
    _type == "subscribeNewsletter" => {
      "type": "subscribeNewsletter",
      ...@
    },
    _type == "statList" => {
      "type": "statList",
      ...@
    },
    _type == "logoList" => {
      "type": "logoList",
      ...@
    },
    _type == "timeline" => {
      "type": "timeline",
      ...@
    },
    _type == "textImage" => {
      "type": "textImage",
      ...@
    },
    _type == "carousel" => {
      "type": "carousel",
      ...@
    },
    _type == "jobOffers" => {
      "type": "jobOffers",
      ...@
    },
    _type == "videoSection" => {
      "type": "videoSection",
      ...@
    },
    _type == "histogram" => {
      "type": "histogram",
      ...@
    }
  }
}`)
