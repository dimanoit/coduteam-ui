import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  baseUrlInterceptor,
  errorHandlingInterceptor,
  loggingInterceptor,
} from './app/core/api/interceptors';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './app/core/api/auth-interceptor.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService,
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loggingInterceptor,
        baseUrlInterceptor,
        authInterceptor,
        errorHandlingInterceptor,
      ]),
    ),
  ],
}).then();
