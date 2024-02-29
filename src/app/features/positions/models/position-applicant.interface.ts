import {PositionApplyStatus} from './position-apply-status';

export interface PositionApplicant {
  positionApplyId: number;
  positionId: number;
  firstName: string;
  lastName: string;
  imageSrc: string;
  title: string;
  status: PositionApplyStatus;
}
