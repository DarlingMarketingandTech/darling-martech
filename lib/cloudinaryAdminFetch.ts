type CloudinaryAdminMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function cloudinaryAdminFetch(
  path: string,
  method: CloudinaryAdminMethod,
  body?: Record<string, unknown>,
) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary environment variables')
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      data?.error?.message ||
      data?.message ||
      `Cloudinary admin request failed with status ${response.status}`

    throw new Error(message)
  }

  return data
}