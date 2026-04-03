import { NextRequest } from 'next/server'

export function assertActionAuth(req: NextRequest): boolean {
  const provided = req.headers.get('x-action-key')
  const expected = process.env.ACTIONS_API_KEY

  return Boolean(expected && provided && provided === expected)
}