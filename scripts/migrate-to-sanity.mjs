import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'

// Load .env.local from project root
dotenv.config({ path: new URL('../.env.local', import.meta.url) })

const cmsData = JSON.parse(readFileSync(new URL('../src/data/cms.json', import.meta.url), 'utf-8'))

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migrate() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('ERROR: Missing SANITY_API_TOKEN in .env.local')
    console.error('Get a token from: https://www.sanity.io/manage/project/9ie44pga/api#tokens')
    process.exit(1)
  }

  console.log('Starting migration...')

  // 1. Hero
  if (cmsData.hero) {
    await client.createOrReplace({
      _type: 'hero',
      _id: 'hero-main',
      greeting: cmsData.hero.greeting,
      name: cmsData.hero.name,
      headline: "I build fast, data-driven web applications that turn complex problems into usable systems.",
      tagline: cmsData.hero.tagline,
      photoUrl: cmsData.hero.photoUrl,
    })
    console.log('✓ Hero migrated')
  }

  // 2. Projects
  for (const proj of cmsData.projects || []) {
    await client.createOrReplace({
      _type: 'projects',
      _id: `project-${proj.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: proj.title,
      oneliner: proj.oneliner,
      description: proj.description,
      tech: proj.tech,
      link: proj.link,
      featured: proj.featured || false,
    })
    console.log(`✓ Project: ${proj.title}`)
  }

  // 3. Experience
  for (const exp of cmsData.experience || []) {
    const safeId = `exp-${exp.company.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    await client.createOrReplace({
      _type: 'experience',
      _id: safeId,
      role: exp.role,
      company: exp.company,
      period: exp.period,
      remote: exp.remote,
      bullets: exp.bullets,
    })
    console.log(`✓ Experience: ${exp.role} at ${exp.company}`)
  }

  // 4. Skills
  if (cmsData.skills) {
    await client.createOrReplace({
      _type: 'skills',
      _id: 'skills-main',
      categories: cmsData.skills.map((cat) => ({
        category: cat.category,
        items: cat.items.map((item) => ({
          name: item,
          usedInProject: true,
          usage: `Used in projects`,
          status: 'active',
        })),
      })),
    })
    console.log('✓ Skills migrated')
  }

  // 5. Certifications
  for (const cert of cmsData.certifications || []) {
    const safeId = `cert-${cert.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`
    await client.createOrReplace({
      _type: 'certifications',
      _id: safeId,
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year,
    })
    console.log(`✓ Certification: ${cert.title}`)
  }

  // 6. About
  if (cmsData.about) {
    await client.createOrReplace({
      _type: 'about',
      _id: 'about-main',
      bio: cmsData.about.bio,
      resumeUrl: cmsData.about.resumeUrl,
      stats: cmsData.about.stats,
      hackathons: cmsData.about.hackathons,
    })
    console.log('✓ About migrated')
  }

  // 7. Contact
  if (cmsData.contact) {
    await client.createOrReplace({
      _type: 'contact',
      _id: 'contact-main',
      copy: cmsData.contact.copy,
      email: cmsData.contact.email,
      github: cmsData.contact.github,
      linkedin: cmsData.contact.linkedin,
      formspree: cmsData.contact.formspree,
    })
    console.log('✓ Contact migrated')
  }

  // 8. Site Config
  await client.createOrReplace({
    _type: 'siteConfig',
    _id: 'site-config-main',
    siteTitle: 'Praneeth Varma K — Portfolio',
    description: 'I engineer ideas into existence.',
    githubUsername: 'pvk-96',
  })
  console.log('✓ Site Config migrated')

  console.log('\n✅ Migration complete! Refresh /studio to see your content.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
