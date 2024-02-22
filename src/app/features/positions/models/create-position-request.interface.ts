import { PositionCategory } from './position-category.enum';

export interface CreatePositionRequest {
  projectId: number;
  title: string;
  description: string;
  shortDescription: string;
  deadLine: Date;
  isRemote: boolean;
  category: PositionCategory;
}
