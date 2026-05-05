import { defineConfig } from 'sanity'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Praneeth Portfolio CMS',
  projectId: '9ie44pga',
  dataset: 'production',
  apiVersion: '2024-01-01',
  basePath: '/studio',
  schema,
})
