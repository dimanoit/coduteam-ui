import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Store } from '../../store/store';
import { getState } from '@ngrx/signals';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const store = inject(Store);

  if (store.token() !== null) {
    req = cloneWithToken(req, store.token()!);
  }

  return next(req).pipe(
    catchError((error) => {
      if (store.isTokenExpired()) {
        if (store.refreshToken() === null) {
          return next(req);
        }

        return store.refreshTokenRx(store.refreshToken()!).pipe(
          switchMap(() => {
            const requestWithToken = cloneWithToken(req, store.token()!);

            return next(requestWithToken);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
}

function cloneWithToken(request: HttpRequest<any>, authToken: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
