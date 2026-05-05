import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'description', title: 'Site Description', type: 'text' }),
    defineField({ name: 'githubUsername', title: 'GitHub Username', type: 'string' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL', type: 'url' }),
  ],
})
