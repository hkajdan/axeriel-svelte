import { defineQuery } from '@sanity/sveltekit'

// Shared pageBuilder projection - single source of truth
const buttonsProjection = `buttons[]{
    ...,
    url{
      ...,
      internal->{
        slug,
        _type
      }
    }
  }`

const pageBuilderProjection = `pageBuilder[]{
    _type,
    _key,
    _type == "hero" => {
      "type": "hero",
      ...,
      video {
        asset-> {
          playbackId
        }
      },
      ${buttonsProjection}
    },
    _type == "cta" => {
      "type": "cta",
      ...@,
      ${buttonsProjection}
    },
    _type == "featureCardsIcon" => {
      "type": "featureCardsIcon",
      ...@
    },
    _type == "productList" => {
      "type": "productList",
      ...@,
      products[]->{
        _id,
        title,
        richText,
        images
      }
    },
    _type == "imageLinkCards" => {
      "type": "imageLinkCards",
      ...@,
      ${buttonsProjection},
      cards[]{
        ...,
        url{
          ...,
          internal->{
            slug,
            _type
          }
        }
      }
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
      ...@,
      logos[]{
        ...,
        url{
          ...,
          internal->{
            slug,
            _type
          }
        }
      }
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
      ...,
      "offers": offers[]->{
        _id,
        title,
        "slug": slug.current,
        image,
        summary,
        profile,
        type
      }
    },
    _type == "videoSection" => {
      "type": "videoSection",
      ...,
      video {
        asset-> {
          playbackId
        }
      }
    },
    _type == "histogram" => {
      "type": "histogram",
      ...@
    }
  }`

export const pageQuery = defineQuery(`*[_type == "page"] | order(_createdAt asc)[0]{
  title,
  slug,
  ${pageBuilderProjection}
}`)

export const pageBySlugQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  ${pageBuilderProjection}
}`)

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  title,
  slug,
  ${pageBuilderProjection}
}`)

export const navbarQuery = defineQuery(`*[_type == "navbar"][0]{
  label,
  columns[]{
    _type,
    _key,
    _type == "navbarColumn" => {
      "type": "navbarColumn",
      title,
      links[]{
        name,
        url{
          ...,
          internal->{
            slug,
            _type
          }
        },
        image
      }
    },
    _type == "navbarLink" => {
      "type": "navbarLink",
      name,
      url{
        ...,
        internal->{
          slug,
          _type
        }
      }
    }
  },
  buttons[]{
    ...,
    url{
      ...,
      internal->{
        slug,
        _type
      }
    }
  }
}`)

export const footerQuery = defineQuery(`*[_type == "footer"][0]{
  label,
  subtitle,
  download,
  logo,
  columns[]{
    title,
    links[]{
      name,
      url{
        ...,
        internal->{
          slug,
          _type
        }
      }
    }
  },
  contact,
  contactAuthor->{
    name,
    position,
    email,
    phone,
    image,
    bio
  },
  location{
    title,
    address,
    city,
    phone,
    lat,
    lng
  }
}`)

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  siteTitle,
  siteDescription,
  logo,
  logoWhite,
  contactEmail,
  socialLinks,
  floatingButton
}`)

export const authorQuery = defineQuery(`*[_type == "author" && _id == $authorId][0]{
  name,
  position,
  email,
  phone,
  image,
  bio
}`)

export const pageAuthorBySlugQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0].author->{
  name,
  position,
  email,
  phone,
  image,
  bio
}`)

export const homePageAuthorQuery = defineQuery(`*[_type == "homePage"][0].author->{
  name,
  position,
  email,
  phone,
  image,
  bio
}`)
