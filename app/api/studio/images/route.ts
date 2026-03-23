import { NextRequest, NextResponse } from 'next/server'

// Cloudinary Admin API is not available on edge runtime — use nodejs runtime
export const runtime = 'nodejs'

interface CloudinaryResource {
  readonly width: number
  readonly height: number
  readonly secure_url: string
  readonly public_id: string
}

interface CloudinarySearchResponse {
  readonly resources?: CloudinaryResource[]
}

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get('folder')
  const recursive = request.nextUrl.searchParams.get('recursive') === 'true'

  if (!folder) {
    return NextResponse.json({ error: 'folder param required' }, { status: 400 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials')
    return NextResponse.json([])
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    // Use asset_folder search - matches ALL images in the folder regardless of public_id structure
    const expression = recursive 
      ? `asset_folder:${folder}*` 
      : `asset_folder:${folder}`

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expression,
          max_results: 500,
          sort_by: [{ created_at: 'desc' }],
          resource_type: 'image', // Exclude videos
        }),
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      console.error('Cloudinary search failed:', await res.text())
      return NextResponse.json([])
    }

    const data = (await res.json()) as CloudinarySearchResponse
    const resources = data.resources ?? []

    // Filter out very small images (likely thumbnails/icons) and format as gallery items
    const images = resources
      .filter((r) => {
        // Exclude tiny images (< 500px on shortest side) — likely not portfolio-worthy
        const minDimension = Math.min(r.width, r.height)
        return minDimension >= 500
      })
      .map((r) => {
        return {
          src: r.secure_url,
          width: r.width,
          height: r.height,
          alt: r.public_id.split('/').pop()?.replaceAll('-', ' ').replaceAll('_', ' ') ?? '',
        }
      })

    return NextResponse.json(images)
  } catch (error) {
    console.error('Cloudinary API error:', error)
    return NextResponse.json([])
  }
}
