import { PositionCategory } from './position-category.enum';
import { PositionApplyStatus } from './position-apply-status';
import { ProjectCategory } from '../../projects/models/project.interface';

export interface PositionSearchRequest {
  projectId?: number;
  positionId?: number;
  projectCategory?: ProjectCategory;
  positionCategory?: PositionCategory;
  take?: number;
  skip?: number;
  term?: string;
  applicationStatus?: PositionApplyStatus;
  withApplicationStatus?: boolean;
  withApplicants?: boolean;
}

// TODO make skip and take base
