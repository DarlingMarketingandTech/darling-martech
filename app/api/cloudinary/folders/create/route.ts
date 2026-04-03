import { NextRequest, NextResponse } from 'next/server'

import { assertActionAuth } from '@/lib/actionAuth'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  if (!assertActionAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { folder } = await req.json()

    if (!folder) {
      return NextResponse.json({ error: 'folder is required' }, { status: 400 })
    }

    const result = await cloudinary.api.create_folder(folder)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Create folder failed' },
      { status: 500 },
    )
  }
}