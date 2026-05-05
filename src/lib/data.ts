import { client } from '@/sanity/lib/client'
import { heroQuery, projectsQuery, experienceQuery, skillsQuery, siteConfigQuery, sectionsQuery, blogsQuery, achievementsQuery, openSourceQuery, testimonialQuery, certificationsQuery, aboutQuery, contactQuery } from '@/sanity/lib/queries'
import cmsData from '@/data/cms.json'

async function safeFetch(query: string, fallback: any) {
  try {
    const result = await client.fetch(query)
    if (result && (Array.isArray(result) ? result.length > 0 : true)) {
      return result
    }
    return fallback
  } catch {
    return fallback
  }
}

export async function getHero() {
  const sanity = await safeFetch(heroQuery, null)
  if (sanity) return sanity
  return cmsData.hero || {}
}

export async function getProjects() {
  const sanity = await safeFetch(projectsQuery, null)
  if (sanity?.length) return sanity
  return cmsData.projects || []
}

export async function getExperience() {
  const sanity = await safeFetch(experienceQuery, null)
  if (sanity?.length) return sanity
  return cmsData.experience || []
}

export async function getSkills() {
  const sanity = await safeFetch(skillsQuery, null)
  if (sanity) return sanity
  return cmsData.skills || []
}

export async function getSections() {
  return await safeFetch(sectionsQuery, [])
}

export async function getBlogs() {
  return await safeFetch(blogsQuery, [])
}

export async function getAchievements() {
  const sanity = await safeFetch(achievementsQuery, null)
  if (sanity?.length) return sanity
  return cmsData.achievements || []
}

export async function getOpenSource() {
  return await safeFetch(openSourceQuery, [])
}

export async function getTestimonials() {
  return await safeFetch(testimonialQuery, [])
}

export async function getCertifications() {
  const sanity = await safeFetch(certificationsQuery, null)
  if (sanity?.length) return sanity
  return cmsData.certifications || []
}

export async function getAbout() {
  const sanity = await safeFetch(aboutQuery, null)
  if (sanity) return sanity
  return cmsData.about || null
}

export async function getContact() {
  const sanity = await safeFetch(contactQuery, null)
  if (sanity) return sanity
  return cmsData.contact || null
}

export async function getSiteConfig() {
  return await safeFetch(siteConfigQuery, null)
}
