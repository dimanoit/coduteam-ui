import { PositionApplyStatus } from './position-apply-status';

export interface ChangePositionApplyStatusRequest {
  positionApplyId: number;
  status: PositionApplyStatus;
}
