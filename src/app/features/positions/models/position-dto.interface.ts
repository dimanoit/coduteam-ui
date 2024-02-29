import { ProjectDto } from '../../projects/models/project-dto.interface';
import { PositionApplyStatus } from './position-apply-status';
import { PositionApplicant } from './position-applicant.interface';

export interface PositionDto {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  currentUserPositionApplyStatus?: PositionApplyStatus;
  applicants: PositionApplicant[];
  project: ProjectDto;
}
