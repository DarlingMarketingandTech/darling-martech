/**
 * Admin proxy auth: `x-action-key` header must match `ACTIONS_API_KEY`.
 */
export function validateActionKey(req: Request): boolean {
  const key = req.headers.get('x-action-key')
  return Boolean(key && key === process.env.ACTIONS_API_KEY)
}
