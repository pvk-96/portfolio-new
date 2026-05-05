import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'section',
  title: 'Dynamic Section',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Section Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'content', title: 'Content', type: 'text' }),
  ],
})
