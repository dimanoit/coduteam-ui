import { PositionDto } from './models/position-dto.interface';
import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

export interface PositionStateModel {
  positions: PositionDto[];
  selectedPosition: PositionDto | null;
  isLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PositionState {
  private state = signalState<PositionStateModel>({
    positions: [],
    selectedPosition: null,
    isLoading: false,
  });

  isLoading = this.state.isLoading;
  data = this.state.positions;

  setIsLoading(isLoading: boolean) {
    patchState(this.state, () => ({ isLoading }));
  }

  setPositions(positions: PositionDto[]): void {
    patchState(this.state, () => ({ positions }));
  }
}
