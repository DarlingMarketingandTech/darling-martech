import type { ProjectMediaMap } from '@/data/assets/types'
import { projectMedia_grastonTechnique } from '@/data/assets/projects/graston-technique'

const projectMediaRegistry = {
  'graston-technique': projectMedia_grastonTechnique,
} satisfies Record<string, ProjectMediaMap>

export function getProjectMedia(projectSlug: string): ProjectMediaMap | null {
  return projectMediaRegistry[projectSlug] ?? null
}
