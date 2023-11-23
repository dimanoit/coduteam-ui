import { PositionStatus } from './position-status.enum';

export interface PositionDto {
  id: number;
  projectName: string;
  projectId: number;
  tittle: string;
  shortDescription: string;
  city: string;
}
