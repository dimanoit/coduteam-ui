import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  AccountRegistrationDto,
  AuthDto,
  User,
} from '../features/user/models/user.interface';
import { UserService } from '../features/user/services/user.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  distinctUntilChanged,
  filter,
  finalize,
  pipe,
  switchMap,
  tap,
} from 'rxjs';

export type UserState = {
  isActivation: boolean;
  isLogging: boolean;
  currentUser: User | null;
};

const initialState: UserState = {
  isActivation: false,
  isLogging: false,
  currentUser: null,
};

export function withUserFeature() {
  return signalStoreFeature(
    withState<UserState>(initialState),
    withComputed(({ currentUser }) => ({
      isLoggedIn: computed(() => currentUser() !== null),
    })),
    withMethods((store, userService = inject(UserService)) => ({
      register: rxMethod<AuthDto>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isActivation: true })),
          switchMap((request) => userService.register(request)),
        ),
      ),

      loadCurrentUser: rxMethod<string | null>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLogging: true })),
          filter((token) => token !== null),
          switchMap(() =>
            userService
              .loadCurrentUser()
              .pipe(
                tap((response) => patchState(store, { currentUser: response })),
              ),
          ),
          finalize(() => patchState(store, { isLogging: false })),
        ),
      ),

      finishRegistration: rxMethod<AccountRegistrationDto>(
        pipe(
          distinctUntilChanged(),
          switchMap((request) =>
            userService
              .finishRegistration(request)
              .pipe(tap(() => patchState(store, { isActivation: false }))),
          ),
        ),
      ),
    })),
  );
}
