/**
 * Simple Sanity Studio embed without next-sanity
 * Uses an iframe to load the LOCAL Studio (started with: npx sanity dev --port 3333)
 */
export const dynamic = 'force-static'

export default function StudioPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        src="http://localhost:3333/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Sanity Studio"
      />
    </div>
  )
}
