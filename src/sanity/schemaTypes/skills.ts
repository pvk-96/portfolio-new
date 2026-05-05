import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Skill Name', type: 'string' },
                    { name: 'usedInProject', title: 'Used in Project', type: 'boolean', initialValue: false },
                    { name: 'usage', title: 'Usage Explanation', type: 'text' },
                    { name: 'status', title: 'Status', type: 'string', options: { list: ['active', 'exploring'] }, initialValue: 'active' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
