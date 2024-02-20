import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { User } from './models/user.interface';

export interface UserStateModel {
  isActivation: boolean;
  isLoading: boolean;
  currentUser: User | null;
}

@Injectable({ providedIn: 'root' })
export class UserState {
  private state = signalState<UserStateModel>({
    isActivation: false,
    isLoading: false,
    currentUser: null,
  });

  isLoading = this.state.isLoading;
  isActivation = this.state.isActivation;
  currentUser = this.state.currentUser;

  setCurrentUser(user: User) {
    patchState(this.state, () => ({ currentUser: user }));
  }

  setIsLoading(isLoading: boolean) {
    patchState(this.state, () => ({ isLoading }));
  }

  setIsActivation(isActivation: boolean) {
    patchState(this.state, () => ({ isActivation }));
  }
}
