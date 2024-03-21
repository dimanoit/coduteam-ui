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
import { State } from './app/state';
import { PositionState } from './app/features/positions/position.state';
import { UserState } from './app/features/user/user.state';
import { ProjectStore } from './app/features/projects/state/project.state';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    MessageService,
    State,
    UserState,
    ProjectStore,
    PositionState,
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
