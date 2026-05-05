import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'featured', title: 'Featured Project', type: 'boolean', initialValue: false }),
    defineField({ name: 'oneliner', title: 'One Liner', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'problem', title: 'Problem', type: 'text' }),
    defineField({ name: 'solution', title: 'Solution', type: 'text' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'impact', title: 'Impact / Technical Depth', type: 'text' }),
    defineField({ name: 'tech', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'link', title: 'GitHub / Live Link', type: 'url' }),
    defineField({ name: 'apiUsage', title: 'API Usage (e.g. FastF1)', type: 'string' }),
    defineField({ name: 'dataProcessing', title: 'Data Processing Notes', type: 'text' }),
    defineField({ name: 'visualization', title: 'Visualization Details', type: 'text' }),
  ],
})
