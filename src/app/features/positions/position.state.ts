import { PositionDto } from './models/position-dto.interface';
import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

export interface PositionStateModel {
  positions: PositionDto[];
  selectedPosition: PositionDto | null;
  myApplications: PositionDto[];
}

@Injectable({ providedIn: 'root' })
export class PositionState {
  private state = signalState<PositionStateModel>({
    positions: [],
    myApplications: [],
    selectedPosition: null,
  });

  positions = this.state.positions;
  myApplications = this.state.myApplications;

  setPositions(positions: PositionDto[]): void {
    patchState(this.state, () => ({ positions }));
  }

  setMyApplications(applications: PositionDto[]): void {
    patchState(this.state, () => ({ myApplications: applications }));
  }
}
