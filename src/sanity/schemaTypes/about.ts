import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL', type: 'url' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'hackathons',
      title: 'Hackathons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'venue', title: 'Venue', type: 'string' },
            { name: 'year', title: 'Year', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
