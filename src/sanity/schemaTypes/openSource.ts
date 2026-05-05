import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'openSource',
  title: 'Open Source',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'link', title: 'Link', type: 'url' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'tech', title: 'Tech Stack', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false }),
  ],
})
