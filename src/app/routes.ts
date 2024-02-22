import { HomeComponent } from './features/home/home.component';
import { ProjectPageComponent } from './features/projects/pages/project-page/project-page.component';
import { AuthGuard } from './features/user/guards/auth.guard';
import { mapToCanActivate, Routes } from '@angular/router';
import { LoginComponent } from './features/user/pages/login/login.component';
import { RegisterComponent } from './features/user/pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'HomeComponent' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'projects',
    canActivate: mapToCanActivate([AuthGuard]),
    loadComponent: () =>
      import(
        './features/projects/pages/projects-page/projects-page.component'
      ).then((x) => x.ProjectsPageComponent),
  },
  {
    path: 'account',
    canActivate: mapToCanActivate([AuthGuard]),
    loadComponent: () =>
      import('./features/user/pages/user/user.component').then(
        (x) => x.UserComponent,
      ),
  },
  {
    path: 'positions',
    loadComponent: () =>
      import('./features/positions/pages/positions/positions.component').then(
        (x) => x.PositionsComponent,
      ),
    canActivate: mapToCanActivate([AuthGuard]),
  },
  {
    path: 'projects/:projectId',
    component: ProjectPageComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
];
