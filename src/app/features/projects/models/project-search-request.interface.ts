export interface ProjectSearchRequest {
  userId?: number;
  projectId?: number;
  take?: number;
  skip?: number;
  onlyRelatedToCurrentUser?: boolean;
}
