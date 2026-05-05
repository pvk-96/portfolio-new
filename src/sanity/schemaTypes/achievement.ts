import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'issuer', title: 'Issuer', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: false }),
  ],
})
