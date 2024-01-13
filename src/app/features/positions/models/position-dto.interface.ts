import { ProjectDto } from '../../projects/models/project-dto.interface';

export interface PositionDto {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  project: ProjectDto;
}
