import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing SANITY_STUDIO_PROJECT_ID or SANITY_API_TOKEN environment variables')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-28',
  useCdn: false,
})

const I18N_TYPES = [
  'homePage', 'page', 'offer', 'product', 'blog', 'blogIndex',
  'settings', 'footer', 'navbar', 'uiStrings'
]

async function migrateDocuments() {
  console.log('Fetching documents to migrate...')

  const typeFilter = I18N_TYPES.map(t => `_type == "${t}"`).join(' || ')
  const docs = await client.fetch(
    `*[${typeFilter} && !defined(language)]{_id, _type}`
  )

  console.log(`Found ${docs.length} documents without language field`)

  let patched = 0
  for (const doc of docs) {
    try {
      await client.patch(doc._id).set({ language: 'fr' }).commit()
      patched++
      if (patched % 10 === 0) {
        console.log(`  Patched ${patched}/${docs.length}...`)
      }
    } catch (err) {
      console.error(`  Failed to patch ${doc._id} (${doc._type}):`, err)
    }
  }

  console.log(`Migration complete: ${patched}/${docs.length} documents tagged as 'fr'`)
}

async function createUiStringsFr() {
  console.log('Creating French uiStrings document...')

  const existing = await client.fetch(`*[_type == "uiStrings" && language == "fr"][0]`)
  if (existing) {
    console.log('French uiStrings document already exists, skipping')
    return
  }

  await client.create({
    _id: 'uiStrings',
    _type: 'uiStrings',
    language: 'fr',
    allOffers: 'Toutes les offres',
    applyByEmail: 'Postuler par email',
    applicationSubject: 'Candidature - ',
    learnMore: 'En savoir plus →',
    noJobOffers: 'Pas d\'offres disponibles',
    noJobOffersDescription: 'Nous sommes toujours à la recherche de talents. Revenez bientôt pour de nouvelles opportunités !',
    ourExpert: 'Notre expert',
    contact: 'Contact',
    allRightsReserved: 'Tous droits réservés.',
    toggleMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  })

  console.log('French uiStrings document created')
}

async function createTranslationMetadata() {
  console.log('Creating translation metadata documents...')

  const docs = await client.fetch(
    `*[language == "fr" && !(_type match "translation.metadata")]{_id, _type}`
  )

  let created = 0
  for (const doc of docs) {
    const metadataId = `translation.metadata.${doc._id}`

    const existing = await client.fetch(`*[_id == $id][0]`, { id: metadataId })
    if (existing) continue

    try {
      await client.create({
        _id: metadataId,
        _type: 'translation.metadata',
        translations: [
          {
            _key: 'fr',
            value: {
              _type: 'reference',
              _ref: doc._id,
            },
          },
        ],
        schemaTypes: [doc._type],
      })
      created++
    } catch (err) {
      console.error(`  Failed to create metadata for ${doc._id}:`, err)
    }
  }

  console.log(`Created ${created} translation metadata documents`)
}

async function main() {
  console.log(`Migrating dataset: ${dataset}`)
  console.log('---')

  await migrateDocuments()
  await createUiStringsFr()
  await createTranslationMetadata()

  console.log('---')
  console.log('All done! You can now deploy the studio with the i18n plugin.')
}

main().catch(console.error)
