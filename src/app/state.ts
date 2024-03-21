import { inject, Injectable } from '@angular/core';
import { ProjectStore } from './features/projects/state/project.state';
import { PositionState } from './features/positions/position.state';
import { UserState } from './features/user/user.state';
import { patchState, signalState } from '@ngrx/signals';

@Injectable({ providedIn: 'root' })
export class State {
  private state = signalState<CoreStateModel>({
    isLoading: false,
  });

  project = inject(ProjectStore);
  position = inject(PositionState);
  user = inject(UserState);
  isLoading = this.state.isLoading;

  startLoading() {
    patchState(this.state, () => ({ isLoading: true }));
  }

  endLoading(): void {
    patchState(this.state, () => ({ isLoading: false }));
  }
}

export interface CoreStateModel {
  isLoading: boolean;
}
