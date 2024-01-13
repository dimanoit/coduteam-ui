import { ProjectCategory } from '../components/project-card/project-category/project-category.enum';

export interface ProjectDto {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  country: string;
  projectImgUrl: string;
}
