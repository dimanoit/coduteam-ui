import { ProjectCategory } from './project.interface';

export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  country: string;
  projectImgUrl: string;
  ownerId: number;
}
