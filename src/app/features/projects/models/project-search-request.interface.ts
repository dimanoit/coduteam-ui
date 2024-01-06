import { ProjectCategory } from '../components/project-card/project-category/project-category.enum';

export interface ProjectSearchRequest {
  userId?: number;
  projectId?: number;
  category?: ProjectCategory;
  term?: string;
  take?: number;
  skip?: number;
  onlyRelatedToCurrentUser?: boolean;
}
