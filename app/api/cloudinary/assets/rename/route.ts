import { NextRequest, NextResponse } from 'next/server'

import { assertActionAuth } from '@/lib/actionAuth'
import cloudinary from '@/lib/cloudinary.server'

export async function POST(req: NextRequest) {
  if (!assertActionAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      from_public_id,
      to_public_id,
      resource_type = 'image',
      overwrite = false,
      invalidate = true,
    } = body

    if (!from_public_id || !to_public_id) {
      return NextResponse.json(
        { error: 'from_public_id and to_public_id are required' },
        { status: 400 },
      )
    }

    const result = await cloudinary.uploader.rename(from_public_id, to_public_id, {
      resource_type,
      overwrite,
      invalidate,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Rename failed' },
      { status: 500 },
    )
  }
}