import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthComponent } from './features/user/auth/auth.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ProjectPageComponent } from './features/projects/project-page/project-page.component';
import { AuthGuard } from './features/user/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'HomeComponent' },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
  {
    path: 'projects/:projectId',
    component: ProjectPageComponent,
    canActivate: mapToCanActivate([AuthGuard]),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
