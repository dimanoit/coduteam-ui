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
import {
  distinctUntilChanged,
  filter,
  Observable,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../features/user/services/auth.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

export enum TokenKeys {
  token = 'token',
  refreshToken = 'refreshToken',
  expirationTime = 'expirationTime',
}

export type TokenState = {
  token: string | null;
  refreshToken: string | null;
  expirationDate: Date | null;
  authFailedErrors: string[];
};

const initialState: TokenState = {
  token: localStorage.getItem(TokenKeys.token),
  refreshToken: localStorage.getItem(TokenKeys.refreshToken),
  expirationDate: new Date(
    localStorage.getItem(TokenKeys.expirationTime) ?? '',
  ),
  authFailedErrors: [],
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

      const refreshTokenRx = (token: string): Observable<AuthToken> => {
        return authService
          .refreshToken(token)
          .pipe(tap((value) => updateToken(value)));
      };

      const login = rxMethod<AuthDto | null>(
        pipe(
          distinctUntilChanged(),
          filter((request) => request !== null),
          switchMap((request) =>
            authService.login(request!).pipe(
              tapResponse(
                (token) => updateToken(token),
                (error: HttpErrorResponse) => {
                  if (error.status === 401) {
                    patchState(store, {
                      authFailedErrors: ['Login or password incorrect'],
                    });
                  }
                },
              ),
            ),
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
    authFailedErrors: [],
  };
}
