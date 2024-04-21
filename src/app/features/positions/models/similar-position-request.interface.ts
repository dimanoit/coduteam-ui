import { ProjectCategory } from '../../projects/models/project.interface';
import { PositionCategory } from './position-category.enum';

export interface SimilarPositionRequest {
  projectCategory: ProjectCategory;
  positionCategory: PositionCategory;
}
