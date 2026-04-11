/**
 * Admin proxy auth: `x-action-key` header must match one of the allowed action keys.
 */
export function validateActionKey(req: Request): boolean {
  const provided = req.headers.get('x-action-key')

  const allowedKeys = [
    process.env.ACTIONS_API_KEY,
    process.env.ACTIONS_API_KEY_MEDIA_OPS,
  ].filter(Boolean) as string[]

  return Boolean(provided && allowedKeys.includes(provided))
}
