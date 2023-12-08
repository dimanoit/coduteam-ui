import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  authInterceptor,
  baseUrlInterceptor,
  errorHandlingInterceptor,
  loggingInterceptor,
} from './app/core/api/interceptors';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService,
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
        baseUrlInterceptor,
        authInterceptor,
        errorHandlingInterceptor,
      ]),
    ),
  ],
});
