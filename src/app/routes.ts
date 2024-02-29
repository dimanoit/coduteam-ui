import { HomeComponent } from './features/home/home.component';
import { ProjectPageComponent } from './features/projects/pages/project-page/project-page.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/pages/login/login.component';
import { RegisterComponent } from './features/user/pages/register/register.component';
import { authGuard } from './features/user/guards/auth.guard';
import { PositionPageComponent } from './features/positions/pages/position-page/position-page.component';

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
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './features/projects/pages/projects-page/projects-page.component'
      ).then((x) => x.ProjectsPageComponent),
  },
  {
    path: 'projects/:projectId',
    component: ProjectPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/user/pages/user/user.component').then(
        (x) => x.UserComponent,
      ),
  },
  {
    path: 'positions',
    loadComponent: () =>
      import(
        './features/positions/pages/positions-page/positions-page.component'
      ).then((x) => x.PositionsPageComponent),
    canActivate: [authGuard],
  },
  {
    path: 'positions/:positionId',
    component: PositionPageComponent,
    canActivate: [authGuard],
  },
];
