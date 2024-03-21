import { ProjectCategory } from './project.interface';

export interface ProjectSearchRequest {
  userId?: number;
  projectId?: number;
  category?: ProjectCategory;
  term?: string;
  take?: number;
  skip?: number;
  onlyRelatedToCurrentUser?: boolean;
}
