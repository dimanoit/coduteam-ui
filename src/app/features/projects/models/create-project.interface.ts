import { ProjectCategory } from '../components/project-card/project-category/project-category.enum';

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: ProjectCategory;
  projectImgUrl?: string | null;
}
