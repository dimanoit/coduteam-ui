export interface PositionSearchRequest {
  projectId?: number;
  positionId?: number;
  take?: number;
  skip?: number;
  term?: string;
}

// TODO make skip and take base
