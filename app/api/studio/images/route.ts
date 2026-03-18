import { NextRequest, NextResponse } from 'next/server'

// Cloudinary Admin API is not available on edge runtime — use nodejs runtime
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get('folder')
  if (!folder) {
    return NextResponse.json({ error: 'folder param required' }, { status: 400 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!apiKey || !apiSecret) {
    // Return empty — Cloudinary admin creds not configured yet
    return NextResponse.json([])
  }

  try {
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${encodeURIComponent(folder)}&max_results=100`,
      {
        headers: { Authorization: `Basic ${credentials}` },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) return NextResponse.json([])

    const data = await res.json()
    const images = (data.resources ?? []).map((r: {
      public_id: string
      secure_url: string
      width: number
      height: number
    }) => ({
      publicId: r.public_id,
      width: r.width,
      height: r.height,
      alt: r.public_id.split('/').pop()?.replace(/-/g, ' ') ?? '',
    }))

    return NextResponse.json(images)
  } catch {
    return NextResponse.json([])
  }
}
