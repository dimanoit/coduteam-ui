import { ProjectDto } from '../../projects/models/project-dto.interface';
import { PositionApplyStatus } from './position-apply-status';
import { PositionApplicant } from './position-applicant.interface';
import { PositionCategory } from './position-category.enum';

export interface PositionDto {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  currentUserPositionApplyStatus?: PositionApplyStatus;
  applicants: PositionApplicant[];
  positionCategory: PositionCategory;
  project: ProjectDto;
  creationDate: Date;
}
