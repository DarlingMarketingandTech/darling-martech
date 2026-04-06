import { NextRequest, NextResponse } from 'next/server'

import { validateActionKey } from '@/lib/auth/validateActionKey'
import { cloudinaryAdminFetch } from '@/lib/cloudinaryAdminFetch'

export async function GET(req: NextRequest) {
  if (!validateActionKey(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const expression = searchParams.get('expression') || ''
    const max_results = Number(searchParams.get('max_results') || '100')
    const next_cursor = searchParams.get('next_cursor') || undefined

    const data = await cloudinaryAdminFetch('/folders/search', 'POST', {
      expression,
      max_results,
      next_cursor,
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Folder search failed' },
      { status: 500 },
    )
  }
}