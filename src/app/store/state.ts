import { inject, Injectable } from '@angular/core';
import {
  patchState,
  signalState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';

export type GlobalState = {
  isLoading: boolean;
};

const initialState: GlobalState = {
  isLoading: false,
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    startLoading(): void {
      patchState(store, () => ({ isLoading: true }));
    },
    endLoading(): void {
      patchState(store, () => ({ isLoading: false }));
    },
  })),
);
