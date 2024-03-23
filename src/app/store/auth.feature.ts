import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthToken } from '../features/user/models/auth-token.interface';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthDto } from '../features/user/models/user.interface';
import { distinctUntilChanged, filter, pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../features/user/services/auth.service';

export enum TokenKeys {
  token = 'token',
  refreshToken = 'refreshToken',
  expirationDate = 'expirationDate',
}

export type TokenState = {
  token: string | null;
  refreshToken: string | null;
  expirationDate: Date | null;
};

const emptyState: TokenState = {
  token: null,
  refreshToken: null,
  expirationDate: null,
};

const initialState: TokenState = {
  token: localStorage.getItem(TokenKeys.token),
  refreshToken: localStorage.getItem(TokenKeys.refreshToken),
  expirationDate: new Date(
    localStorage.getItem(TokenKeys.expirationDate) ?? '',
  ),
};

export function withAuthFeature() {
  return signalStoreFeature(
    withState<TokenState>(initialState),
    withComputed(({ expirationDate }) => ({
      isTokenExpired: computed(() => isTokenExpired(expirationDate())),
    })),
    withMethods((store, authService = inject(AuthService)) => {
      const updateToken = (token: AuthToken) => {
        addTokenToLocalStorage(token);
        const tokenState = toTokenState(token);
        patchState(store, () => tokenState);
      };

      const refreshTokenRx = rxMethod<string>(
        pipe(
          distinctUntilChanged(),
          switchMap((token) =>
            authService
              .refreshToken(token)
              .pipe(tap((value) => updateToken(value))),
          ),
        ),
      );

      const login = rxMethod<AuthDto | null>(
        pipe(
          distinctUntilChanged(),
          filter((request) => request !== null),
          switchMap((request) =>
            authService
              .login(request!)
              .pipe(tap((token) => updateToken(token))),
          ),
        ),
      );

      return { updateToken, login, refreshTokenRx };
    }),
  );
}

function getExpirationDate(expiresInSeconds: number): Date {
  const expirationTimestamp = Date.now() + expiresInSeconds * 1000;
  const expirationDate = new Date(expirationTimestamp);

  return new Date(expirationDate.toISOString());
}

function addTokenToLocalStorage(authToken: AuthToken): void {
  localStorage.setItem('token', authToken.accessToken);
  localStorage.setItem('refreshToken', authToken.refreshToken);
  localStorage.setItem(
    'expirationTime',
    getExpirationDate(authToken.expiresIn).toISOString(),
  );
}

function isTokenExpired(expirationDate: Date | null) {
  if (expirationDate === null) return true;

  return expirationDate <= new Date();
}

function toTokenState(authToken: AuthToken): TokenState {
  return {
    expirationDate: getExpirationDate(authToken.expiresIn),
    refreshToken: authToken.refreshToken,
    token: authToken.accessToken,
  };
}
