'use client'

export type SceneVariant = 'hero' | 'work' | 'lab'

export type SceneIntensity = 'calm' | 'balanced' | 'active'

export type SceneInteractiveTarget = string | null

export type SceneContract = {
  variant: SceneVariant
  intensity?: SceneIntensity
  interactiveTarget?: SceneInteractiveTarget
  reducedMotion?: boolean
}

export function getSceneIntensityValue(intensity: SceneIntensity = 'balanced') {
  if (intensity === 'calm') return 0.65
  if (intensity === 'active') return 1.35
  return 1
}

export function getTargetIndex(target: SceneInteractiveTarget, length: number) {
  if (!target || length <= 0) return -1

  let hash = 0

  for (let index = 0; index < target.length; index += 1) {
    hash = (hash * 31 + target.charCodeAt(index)) | 0
  }

  return Math.abs(hash) % length
}
