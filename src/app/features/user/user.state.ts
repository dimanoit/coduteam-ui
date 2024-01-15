import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

export interface UserStateModel {
  isActivation: boolean;
  isLoading: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserState {
  private state = signalState<UserStateModel>({
    isActivation: false,
    isLoading: false,
  });

  isLoading = this.state.isLoading;
  isActivation = this.state.isLoading;

  setIsLoading(isLoading: boolean) {
    patchState(this.state, () => ({ isLoading }));
  }

  setIsActivation(isActivation: boolean) {
    patchState(this.state, () => ({ isActivation }));
  }
}
