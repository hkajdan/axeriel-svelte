import { defineQuery } from '@sanity/sveltekit'

// Shared projections - single source of truth
// Resolves internal references in portable text markDefs (customLink marks)
const portableTextProjection = (fieldName: string) => `${fieldName}[]{
    ...,
    markDefs[]{
      ...,
      _type == "customLink" => {
        ...,
        customLink{
          ...,
          internal->{
            _id,
            _type,
            slug
          }
        }
      }
    }
  }`

const richTextProjection = portableTextProjection('richText')

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
      ${richTextProjection},
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
      ${richTextProjection},
      ${buttonsProjection}
    },
    _type == "featureCardsIcon" => {
      "type": "featureCardsIcon",
      ...@,
      ${richTextProjection}
    },
    _type == "productList" => {
      "type": "productList",
      ...@,
      ${richTextProjection},
      products[]{
        _ref,
        _key,
        "productData": @->{
          _id,
          title,
          ${richTextProjection},
          images
        }
      }
    },
    _type == "imageLinkCards" => {
      "type": "imageLinkCards",
      ...@,
      ${richTextProjection},
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
      ...@,
      ${portableTextProjection('subTitle')}
    },
    _type == "statList" => {
      "type": "statList",
      ...@,
      ${richTextProjection}
    },
    _type == "logoList" => {
      "type": "logoList",
      ...@,
      ${richTextProjection},
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
      ...@,
      ${richTextProjection}
    },
    _type == "textImage" => {
      "type": "textImage",
      ...@,
      ${richTextProjection}
    },
    _type == "carousel" => {
      "type": "carousel",
      ...@,
      ${richTextProjection}
    },
    _type == "jobOffers" => {
      "type": "jobOffers",
      ...,
      ${richTextProjection},
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
      ${richTextProjection},
      video {
        asset-> {
          playbackId
        }
      }
    },
    _type == "histogram" => {
      "type": "histogram",
      ...@,
      ${richTextProjection}
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

export const offerBySlugQuery = defineQuery(`*[_type == "offer" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  image,
  summary,
  ${portableTextProjection('description')},
  profile,
  type
}`)
