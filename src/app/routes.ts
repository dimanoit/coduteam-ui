import { HomeComponent } from './features/home/home.component';
import { AuthComponent } from './features/user/pages/auth/auth.component';
import { ProjectComponent } from './features/projects/pages/project-page/project.component';
import { AuthGuard } from './features/user/guards/auth.guard';
import { mapToCanActivate, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'HomeComponent' },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'projects',
    canActivate: mapToCanActivate([AuthGuard]),
    loadComponent: () =>
      import('./features/projects/pages/projects/projects.component').then(
        (x) => x.ProjectsComponent,
      ),
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
    component: ProjectComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
];