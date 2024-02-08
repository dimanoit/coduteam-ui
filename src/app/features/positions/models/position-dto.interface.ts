import { ProjectDto } from '../../projects/models/project-dto.interface';
import { PositionApplyStatus } from './position-apply-status';

export interface PositionDto {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  currentUserPositionApplyStatus?: PositionApplyStatus;
  project: ProjectDto;
}
