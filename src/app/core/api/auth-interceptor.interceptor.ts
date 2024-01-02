import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/user/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenManagementService } from '../../features/user/services/token-management.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(AuthService);
  const tokenManagementService = inject(TokenManagementService);

  req = cloneWithToken(req, tokenManagementService.getAuthToken());

  return next(req).pipe(
    catchError((error) => {
      if (
        tokenManagementService.isTokenExpired() ||
        (error instanceof HttpErrorResponse && error.status === 401)
      ) {
        return handle401Error(req, next, authService, tokenManagementService);
      }

      return throwError(() => error);
    }),
  );
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  tokenManagementService: TokenManagementService,
) {
  if (!tokenManagementService.getRefreshToken()) {
    return next(request);
  }

  return authService.refreshToken().pipe(
    switchMap(() => {
      const requestWithToken = cloneWithToken(
        request,
        tokenManagementService.getAuthToken(),
      );

      return next(requestWithToken);
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
