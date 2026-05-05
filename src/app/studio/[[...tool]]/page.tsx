/**
 * Simple Sanity Studio embed without next-sanity
 * Uses an iframe to load the hosted Studio
 */
export const dynamic = 'force-static'

export default function StudioPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe
        src="https://9ie44pga.sanity.studio"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Sanity Studio"
      />
    </div>
  )
}
