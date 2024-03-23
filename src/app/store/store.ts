import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withProjectFeature } from './project.feature';
import { withPositionFeature } from './position.feature';
import { withUserFeature } from './user.feature';
import { withAuthFeature } from './auth.feature';

export type GlobalState = {
  isLoading: boolean;
};

const initialState: GlobalState = {
  isLoading: false,
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProjectFeature(),
  withPositionFeature(),
  withAuthFeature(),
  withUserFeature(),
  withMethods((store) => ({
    startLoading(): void {
      patchState(store, () => ({ isLoading: true }));
    },
    endLoading(): void {
      patchState(store, () => ({ isLoading: false }));
    },
    logout(): void {
      localStorage.clear();
      patchState(store, () => ({ token: null }));
      patchState(store, () => ({ currentUser: null }));
    },
  })),
);
