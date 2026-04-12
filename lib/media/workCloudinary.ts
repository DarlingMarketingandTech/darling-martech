import { buildCloudinaryUrl } from '@/lib/cloudinary'

/**
 * Work image delivery presets (URL-based transformations only).
 *
 * Safety:
 * - Does not rename/move assets (publicId passed through).
 * - Does not create/overwrite named transformations in Cloudinary.
 * - Uses only the approved transformation patterns for Work pages.
 */

export const WORK_CARD = 'c_fill,g_auto,w_800,h_600,f_auto,q_auto' as const
export const WORK_HERO = 'c_fill,g_auto,w_1400,h_900,f_auto,q_auto' as const
export const WORK_SUPPORT = 'c_fit,w_900,f_auto,q_auto' as const
export const WORK_UI = 'c_limit,w_700,f_auto,q_auto' as const

export type WorkImagePreset = 'WORK_CARD' | 'WORK_HERO' | 'WORK_SUPPORT' | 'WORK_UI'

export const WORK_TRANSFORMS: Record<WorkImagePreset, string> = {
  WORK_CARD,
  WORK_HERO,
  WORK_SUPPORT,
  WORK_UI,
}

export function getWorkCloudinaryUrl(publicId: string, preset: WorkImagePreset): string {
  return buildCloudinaryUrl(publicId, WORK_TRANSFORMS[preset])
}

