import { PositionStatus } from './position-status.enum';

export interface Position {
  id: string;
  projectId: string;
  tittle: string;
  status: PositionStatus;
  shortDescription: string;
  longDescription: string;
  deadline: Date;
  openNumber: number;
}
