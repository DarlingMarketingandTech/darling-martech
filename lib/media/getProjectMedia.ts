import type { ProjectMediaMap } from "@/data/assets/types";
import { projectMedia_grastonTechnique } from "@/data/assets/projects/graston-technique";
import { projectMedia_hoosierBoyBarbershop } from "@/data/assets/projects/hoosier-boy-barbershop";
import { projectMedia_pikeMedicalConsultants } from "@/data/assets/projects/pike-medical-consultants";
import { projectMedia_primarycareIndy } from "@/data/assets/projects/primarycare-indy";
import { projectMedia_russellPainting } from "@/data/assets/projects/russell-painting";

const projectMediaRegistry: Record<string, ProjectMediaMap> = {
  "graston-technique": projectMedia_grastonTechnique,
  "hoosier-boy-barbershop": projectMedia_hoosierBoyBarbershop,
  "pike-medical-consultants": projectMedia_pikeMedicalConsultants,
  "primarycare-indy": projectMedia_primarycareIndy,
  "russell-painting": projectMedia_russellPainting,
};

export function getProjectMedia(projectSlug: string): ProjectMediaMap | null {
  return projectMediaRegistry[projectSlug] ?? null;
}
