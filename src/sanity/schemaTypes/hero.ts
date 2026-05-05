import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'greeting', title: 'Greeting', type: 'string' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'text' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'text' }),
    defineField({ name: 'photoUrl', title: 'Photo URL', type: 'url' }),
    defineField({ name: 'resumeUrl', title: 'Resume URL', type: 'url' }),
  ],
})
