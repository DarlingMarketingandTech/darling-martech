import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

export async function POST(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { folder, to_folder } = await req.json()

    if (!folder || !to_folder) {
      return NextResponse.json(
        { error: 'folder and to_folder are required' },
        { status: 400 },
      )
    }

    const data = await cloudinaryAdminFetch(
      `/folders/${encodeURIComponent(folder)}`,
      'PUT',
      { to_folder },
    )

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Move folder failed' },
      { status: 500 },
    )
  }
}