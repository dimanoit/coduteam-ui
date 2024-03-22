import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  signalStoreFeature,
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
import { distinctUntilChanged, filter, pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../features/user/services/auth.service';
import { Router } from '@angular/router';

export type UserState = {
  isActivation: boolean;
  isLoading: boolean;
  currentUser: User | null;
  credentials: AuthDto | null;
};

const initialState: UserState = {
  isActivation: false,
  isLoading: false,
  currentUser: null,
  credentials: null,
};

export function withUserFeature() {
  return signalStoreFeature(
    withState<UserState>(initialState),
    withMethods(
      (
        store,
        authService = inject(AuthService),
        userService = inject(UserService),
        router = inject(Router),
      ) => ({
        register: rxMethod<AuthDto>(
          pipe(
            distinctUntilChanged(),
            tap((credentials) =>
              patchState(store, () => ({ credentials: credentials })),
            ),
            tap(() => patchState(store, () => ({ isActivation: true }))),
            switchMap((request) => userService.register(request)),
          ),
        ),

        login: rxMethod<AuthDto | null>(
          pipe(
            distinctUntilChanged(),
            filter((request) => request !== null),
            switchMap((request) =>
              authService.login(request!).pipe(
                tap(() => {
                  router.navigate(['/projects']);
                }),
              ),
            ),
          ),
        ),

        loadCurrentUser: rxMethod<void>(
          pipe(
            switchMap(() =>
              userService
                .loadCurrentUser()
                .pipe(
                  tap((response) =>
                    patchState(store, () => ({ currentUser: response })),
                  ),
                ),
            ),
          ),
        ),

        finishRegistration: rxMethod<AccountRegistrationDto>(
          pipe(
            distinctUntilChanged(),
            switchMap((request) =>
              userService.finishRegistration(request).pipe(
                tap(() =>
                  patchState(store, () => ({
                    isActivation: false,
                  })),
                ),
              ),
            ),
          ),
        ),
      }),
    ),
  );
}
