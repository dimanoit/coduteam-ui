export interface CreatePositionRequest {
  projectId: number;
  title: string;
  description: string;
  shortDescription: string;
  deadLine: Date;
  isRemote: boolean;
}
