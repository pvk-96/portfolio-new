import { NextRequest, NextResponse } from 'next/server'

const FORMSPREE_URL = 'https://formspree.io/f/mlgaqyka'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json().catch(() => null)
      return NextResponse.json(
        { error: error?.error || 'Formspree submission failed' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
