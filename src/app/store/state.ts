import { inject, Injectable } from '@angular/core';
import { ProjectStore } from './project.store';
import { PositionStore } from './position.store';
import { UserStore } from './user.store';
import { patchState, signalState } from '@ngrx/signals';

@Injectable({ providedIn: 'root' })
export class State {
  private state = signalState<CoreStateModel>({
    isLoading: false,
  });

  project = inject(ProjectStore);
  position = inject(PositionStore);
  user = inject(UserStore);
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
