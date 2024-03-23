import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Store } from '../../store/store';

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
        return handle401Error(req, next);
      }

      return throwError(() => error);
    }),
  );
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn) {
  const store = inject(Store);
  if (store.refreshToken() === null) {
    return next(request);
  }

  store.refreshTokenRx(store.refreshToken()!);

  const requestWithToken = cloneWithToken(request, store.token()!);
  return next(requestWithToken);
}

function cloneWithToken(request: HttpRequest<any>, authToken: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
