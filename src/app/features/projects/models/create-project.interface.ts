import { ProjectCategory } from './project.interface';

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: ProjectCategory;
  projectImgUrl?: string | null;
}
