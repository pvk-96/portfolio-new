import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import projects from './projects'
import experience from './experience'
import skills from './skills'
import section from './section'
import blog from './blog'
import achievement from './achievement'
import openSource from './openSource'
import testimonial from './testimonial'
import siteConfig from './siteConfig'
import certifications from './certifications'
import about from './about'
import contact from './contact'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    projects,
    experience,
    skills,
    section,
    blog,
    achievement,
    openSource,
    testimonial,
    siteConfig,
    certifications,
    about,
    contact,
  ],
}
