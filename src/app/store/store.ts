import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withProjectFeature } from './project.feature';
import { withPositionFeature } from './position.feature';
import { withUserFeature } from './user.feature';

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
  withUserFeature(),
  withMethods((store) => ({
    startLoading(): void {
      patchState(store, () => ({ isLoading: true }));
    },
    endLoading(): void {
      patchState(store, () => ({ isLoading: false }));
    },
  })),
);
