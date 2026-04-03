import { NextRequest, NextResponse } from 'next/server'

import { assertActionAuth } from '@/lib/actionAuth'
import cloudinary from '@/lib/cloudinary'

export async function GET(req: NextRequest) {
  if (!assertActionAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const expression = searchParams.get('expression')
    const max_results = Number(searchParams.get('max_results') || '30')
    const next_cursor = searchParams.get('next_cursor') || undefined

    if (!expression) {
      return NextResponse.json(
        { error: 'expression is required' },
        { status: 400 },
      )
    }

    let search = cloudinary.search
      .expression(expression)
      .sort_by('uploaded_at', 'desc')
      .max_results(max_results)
      .with_field('tags')
      .with_field('context')

    if (next_cursor) {
      search = search.next_cursor(next_cursor)
    }

    const result = await search.execute()

    return NextResponse.json({
      expression,
      total_count: result.total_count ?? result.resources?.length ?? 0,
      resources: result.resources ?? [],
      next_cursor: result.next_cursor ?? null,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Asset search failed' },
      { status: 500 },
    )
  }
}