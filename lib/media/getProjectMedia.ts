import type { ProjectMediaMap } from "@/data/assets/types";
import { projectMedia_bbq317 } from "@/data/assets/projects/317-bbq";
import { projectMedia_blackLetter } from "@/data/assets/projects/black-letter";
import { projectMedia_barbershopCommandCenter } from "@/data/assets/projects/barbershop-command-center";
import { projectMedia_grastonTechnique } from "@/data/assets/projects/graston-technique";
import { projectMedia_hoosierBoyBarbershop } from "@/data/assets/projects/hoosier-boy-barbershop";
import { projectMedia_pikeMedicalConsultants } from "@/data/assets/projects/pike-medical-consultants";
import { projectMedia_primarycareIndy } from "@/data/assets/projects/primarycare-indy";
import { projectMedia_russellPainting } from "@/data/assets/projects/russell-painting";
import { projectMedia_urgentCareIndy } from "@/data/assets/projects/urgentcare-indy";

const projectMediaRegistry: Record<string, ProjectMediaMap> = {
  "317-bbq": projectMedia_bbq317,
  "barbershop-command-center": projectMedia_barbershopCommandCenter,
  "black-letter": projectMedia_blackLetter,
  "graston-technique": projectMedia_grastonTechnique,
  "hoosier-boy-barbershop": projectMedia_hoosierBoyBarbershop,
  "pike-medical-consultants": projectMedia_pikeMedicalConsultants,
  "primarycare-indy": projectMedia_primarycareIndy,
  "russell-painting": projectMedia_russellPainting,
  "urgentcare-indy": projectMedia_urgentCareIndy,
};

export function getProjectMedia(projectSlug: string): ProjectMediaMap | null {
  return projectMediaRegistry[projectSlug] ?? null;
}
