import type { ProjectMediaMap } from '@/data/assets/types'
import { projectMedia_grastonTechnique } from '@/data/assets/projects/graston-technique'

const projectMediaRegistry: Record<string, ProjectMediaMap> = {
  'graston-technique': projectMedia_grastonTechnique,
}

export function getProjectMedia(projectSlug: string): ProjectMediaMap | null {
  return projectMediaRegistry[projectSlug] ?? null
}
