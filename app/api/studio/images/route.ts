import { NextRequest, NextResponse } from 'next/server'

// Cloudinary Admin API is not available on edge runtime — use nodejs runtime
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get('folder')
  const recursive = request.nextUrl.searchParams.get('recursive') === 'true'

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

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    let resources: Array<{ public_id: string; width: number; height: number }>

    if (recursive) {
      // Cloudinary Search API — returns all images in folder and all subfolders
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            expression: `folder:${folder}/*`,
            max_results: 500,
            sort_by: [{ created_at: 'desc' }],
          }),
          next: { revalidate: 3600 },
        }
      )

      if (!res.ok) return NextResponse.json([])
      const data = await res.json()
      resources = data.resources ?? []
    } else {
      // Cloudinary Admin API — prefix query, direct children only
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?type=upload&prefix=${encodeURIComponent(folder)}&max_results=100`,
        {
          headers: { Authorization: `Basic ${credentials}` },
          next: { revalidate: 3600 },
        }
      )

      if (!res.ok) return NextResponse.json([])
      const data = await res.json()
      resources = data.resources ?? []
    }

    const images = resources.map((r) => ({
      publicId: r.public_id,
      width: r.width,
      height: r.height,
      alt: r.public_id.split('/').pop()?.replaceAll('-', ' ') ?? '',
    }))

    return NextResponse.json(images)
  } catch {
    return NextResponse.json([])
  }
}
