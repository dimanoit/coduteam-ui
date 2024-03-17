export enum PositionApplyStatus {
  Sent = 'Sent',
  OnReview = 'OnReview',
  Rejected = 'Rejected',
  Confirmed = 'Confirmed',
}

export type PositionApplyStatusTags = {
  [key in PositionApplyStatus]: string;
};
