import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Praneeth Portfolio CMS',
  projectId: '9ie44pga',
  dataset: 'production',
  apiVersion: '2024-01-01',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
})
