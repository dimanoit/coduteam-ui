import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { State } from '../../state';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(req.url, 'returned a response with status', event.status);
      }
    }),
  );
}

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const state = inject(State);

  state.startLoading();
  return next(req).pipe(finalize(() => state.endLoading()));
}

export function baseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const apiReq = req.clone({ url: environment.apiUrl + req.url });
  return next(apiReq);
}

export function errorHandlingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        let errorMessage = 'An unknown error occurred!';
        if (error.message) {
          errorMessage = error.message;
        }

        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }

      return throwError(() => error);
    }),
  );
}
