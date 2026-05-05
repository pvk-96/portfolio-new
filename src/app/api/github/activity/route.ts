import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'pvk-96'

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
  }

  try {
    // Fetch repos
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=10&sort=pushed`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    )

    if (!reposRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch repos' }, { status: reposRes.status })
    }

    const repos = await reposRes.json()
    const reposCount = repos.length

    // Estimate commits from top repos
    let totalCommits = 0
    const topRepos = repos.slice(0, 5)

    await Promise.all(
      topRepos.map(async (repo: any) => {
        try {
          const commitsRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
            { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
          )
          if (commitsRes.ok) {
            const linkHeader = commitsRes.headers.get('Link') || ''
            const match = linkHeader.match(/page=(\d+)>; rel="last"/)
            if (match) {
              totalCommits += parseInt(match[1], 10)
            } else {
              totalCommits += 1
            }
          }
        } catch {
          // Skip on error
        }
      })
    )

    return NextResponse.json({
      repos: reposCount,
      estimatedCommits: totalCommits || reposCount * 15, // Fallback estimate
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
