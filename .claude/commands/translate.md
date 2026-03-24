# Translate a Sanity document from French to English

Translate the Sanity CMS document with ID `$ARGUMENTS` from French to English.

## Business Context

**AXERIEL** is a French electrotechnical equipment integrator founded in 2014 (lineage from PEINTAMELEC, 1969), based in Gières, France. The company designs, engineers, manufactures, integrates, installs, tests and controls electrotechnical equipment for demanding industrial clients.

**Markets**: Nuclear safety (ISO 19443), industrial projects (process, manufacturing, defense, rail, energy), T&D substations.

**Expertise**: Project management, engineering studies (CAD: AUTOCAD, SEE Electrical, EPLAN, SOLIDWORKS), sheet metal fabrication, assembly, wiring, prefabricated integration (shelters, containers, trailers), on-site installation, testing & inspection, supply chain management.

**Certifications**: ISO 9001:2015, ISO 19443:2018. ATEX accreditation.

**Key figures**: ~40 employees, 3,000m² facility, €4.2M revenue (2024), targeting €6M by 2027.

## Technical Glossary (FR → EN)

Use these exact translations for consistency across the site:

| French | English |
|--------|---------|
| Tableaux de distribution | Distribution panels |
| Tableaux de contrôle-commande et d'automatismes | Control, command & automation panels |
| Préfabriqués / Préfabrications | Prefabricated units |
| Productions répétitives | Repetitive production |
| Équipements électrotechniques | Electrotechnical equipment |
| Sûreté / Sureté nucléaire | Nuclear safety |
| Contrôles et essais | Testing & inspection |
| Réalisation, intégration, installation | Manufacturing, integration & installation |
| Chaîne d'approvisionnement | Supply chain |
| Gestion de projets et études | Project management & engineering |
| Qualité Sûreté | Quality & Safety |
| Bureau d'études (BE) | Design office |
| Chargé d'affaires | Business manager |
| Cahier des charges | Specifications |
| Mise en service | Commissioning |
| Jeux de barres | Busbars |
| Tôlerie | Sheet metalwork |
| Câblage | Wiring |
| Montage | Assembly |
| Repérage | Labeling / Identification |
| Armoire électrique | Electrical cabinet |
| Coffret | Enclosure |
| Platine | Mounting plate |
| Goulotte | Cable trunking |
| Rail DIN | DIN rail |
| Essais fonctionnels | Functional testing |
| Essais sous tension | Live testing |
| Contrôle de conformité | Compliance inspection |
| Sous-traitance | Subcontracting |
| Domaine d'Activité Stratégique | Strategic Business Unit |
| QSSE / QSEE | QHSE (Quality, Health, Safety, Environment) |
| Habilitation ATEX | ATEX accreditation |
| Basse tension (BT) | Low voltage (LV) |
| Moyenne tension (MT) | Medium voltage (MV) |
| Transport & Distribution (T&D) | Transmission & Distribution (T&D) |
| Procédés industriels | Industrial processes |
| Machines spéciales | Special-purpose machines |
| Intégration en shelters | Shelter integration |
| Intégration en containers | Container integration |
| Intégration sur remorques | Trailer integration |
| Bancs de test / Moyens d'essais | Test benches / Test equipment |
| Nomenclature | Bill of materials |
| Dossier de fabrication | Manufacturing file |
| Note de calcul | Calculation note |
| Schéma électrique | Electrical diagram |
| Plan d'implantation | Layout plan |
| CDI | Permanent contract |
| Convention collective de la Métallurgie | Metalworking collective agreement |

## Translation Rules

### Tone & Style
- **Formal corporate tone**. Professional, precise, confident.
- Use industry-standard English terminology (IEEE, IEC conventions where applicable).
- Keep sentences clear and direct. Avoid over-literal translations — adapt to natural English phrasing.
- Preserve the authoritative, expertise-driven voice of the original.

### What NOT to translate
- **AXERIEL** (company name)
- **ISO 9001**, **ISO 19443**, **ISO 19443 V2018** (certification references)
- **ATEX** (regulation name)
- Technical acronyms: **CAO/CAD**, **FAT**, **CCP**, **LCC**, **PCCN**, **PLC**, **DCS**, **SCADA**, **CEM**, **SIL**, **DRSF**, **IGI1300**
- Software names: **AUTOCAD**, **SEE Electrical**, **EPLAN**, **PROPANEL**, **SOLIDWORKS**, **CANECO**
- Person names: **Philippe MARRO**
- Location names: **Gières**, **Grenoble**
- Company names: **PEINTAMELEC**, **PEINTAMELEC ALPES**, **PEINTAMELEC CONSTRUCTION**

### Slugs
- Do NOT change the slug. The language prefix (`/en/`) is handled by the SvelteKit routing layer.

## Sanity Technical Instructions

### Step-by-step process

1. **Fetch the source document**
   - Use the Sanity MCP `get_document` tool to fetch the document by ID: `$ARGUMENTS`
   - Verify it has `language: "fr"`. If not, stop and inform the user.
   - Note the `_type` of the document.

2. **Fetch the translation metadata**
   - Query: `*[_type == "translation.metadata" && references("$ARGUMENTS")][0]`
   - Check if an EN translation already exists. If yes, ask the user whether to overwrite.

3. **Translate the document content**
   - Translate all user-facing text fields (title, description, summary, profile, richText, pageBuilder blocks, SEO fields, OG fields, button texts, card titles, stat labels, timeline entries, histogram labels, etc.)
   - For **Portable Text** (richText, description, caption):
     - ONLY translate the `text` field inside `children[].text` spans
     - Keep ALL `_key`, `_type`, `style`, `marks`, `markDefs`, `listItem`, `level` EXACTLY as-is
     - Keep `customLink` references pointing to FR page IDs (they will be updated separately when FR pages get translated)
   - Keep all asset references (`image`, `video`, `file`) exactly as-is
   - Keep all document references (`_ref`) exactly as-is (unless they point to documents that have EN translations — in that case, ask the user)
   - Keep `anchor` fields as-is (they are used for in-page navigation)
   - Keep `backgroundColor`, `imagePosition`, `variant`, `openInNewTab` and other UI config fields as-is
   - Do NOT copy: `_id`, `_rev`, `_createdAt`, `_updatedAt`, `orderRank`

4. **Create the EN document**
   - Use the Sanity HTTP API via curl to create directly as published:
   ```bash
   EN_ID=$(uuidgen | tr '[:upper:]' '[:lower:]')
   curl -s -X POST "https://rr45fpa4.api.sanity.io/v2024-01-01/data/mutate/production" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $SANITY_API_TOKEN" \
     -d '{"mutations": [{"createIfNotExists": {"_id": "'$EN_ID'", "_type": "DOCTYPE", "language": "en", ...}}]}'
   ```
   - Read the API token from `apps/studio/.env` (`SANITY_API_TOKEN`)

5. **Update translation metadata**
   - Patch the existing metadata document to add the EN entry:
   ```json
   {
     "patch": {
       "id": "translation.metadata.FR_DOC_ID",
       "set": {
         "translations": [
           {"_key": "fr", "_type": "internationalizedArrayReferenceValue", "language": "fr", "value": {"_ref": "FR_DOC_ID", "_type": "reference"}},
           {"_key": "en", "_type": "internationalizedArrayReferenceValue", "language": "en", "value": {"_ref": "EN_DOC_ID", "_type": "reference"}}
         ]
       }
     }
   }
   ```
   - If no metadata document exists, create one with ID `translation.metadata.FR_DOC_ID`.

6. **Report the result**
   - Show the user: FR doc ID, EN doc ID, document type, title (FR → EN)
   - Confirm it's published and metadata is linked
   - Mention if any internal references still point to FR documents

### Document type specifics

- **page**: Has `pageBuilder` array with blocks (hero, textImage, productList, jobOffers, cta, timeline, featureCardsIcon, statList, histogram, logoList). Translate text in all blocks. For `productList`/`jobOffers`, keep references as-is.
- **product**: Has `title`, `richText` (Portable Text), `images[]` with optional `caption` (Portable Text). Translate title, richText texts, and captions.
- **offer**: Has `title`, `slug`, `summary`, `profile`, `type`, `description` (Portable Text), `image`. Translate all text fields.
- **blog**: Has `title`, `slug`, `excerpt`, `body` (Portable Text), `image`, `author`, `categories`. Translate text fields.
- **blogIndex**: Has `title`, `description`, `slug`. Translate text fields.
- **homePage**: Has complex pageBuilder. Translate all text content in all blocks.

## Quality checklist

Before finishing, verify:
- [ ] EN document is published (not just a draft)
- [ ] `language` field is set to `"en"`
- [ ] Translation metadata links both FR and EN with correct `internationalizedArrayReferenceValue` format including `language` field
- [ ] No `_rev`, `_createdAt`, `_updatedAt` were copied
- [ ] All image/video/file asset references are preserved
- [ ] Portable Text structure is intact (same number of blocks, same marks/markDefs)
