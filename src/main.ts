import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  baseUrlInterceptor,
  errorHandlingInterceptor,
  loadingInterceptor,
  loggingInterceptor,
} from './app/core/api/interceptors';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './app/core/api/auth-interceptor.interceptor';
import { PositionStore } from './app/store/position.store';
import { UserStore } from './app/store/user.store';
import { ProjectStore } from './app/store/project.store';
import { GlobalStore } from './app/store/state';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService,
    GlobalStore,
    UserStore,
    ProjectStore,
    PositionStore,
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loggingInterceptor,
        baseUrlInterceptor,
        authInterceptor,
        loadingInterceptor,
        errorHandlingInterceptor,
      ]),
    ),
  ],
}).then();
