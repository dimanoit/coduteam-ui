import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProjectSearchRequest } from '../../models/project-search-request.interface';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';
import { ButtonModule } from 'primeng/button';
import { CreateProjectRequest } from '../../models/create-project.interface';
import { ProjectsNotFoundComponent } from '../../components/projects-not-found/projects-not-found.component';
import { Store } from '../../../../store/store';
import { ScrollerModule } from 'primeng/scroller';
import { Project } from '../../models/project.interface';
import { InfiniteScrollDirective } from '../../../../shared/directives/infinite-scroll-directive';
import { defaultProjectSearchRequest } from '../../../../store/project.feature';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  imports: [
    CommonModule,
    ProjectsFilterComponent,
    ToggleButtonModule,
    ProjectLineComponent,
    SkeletonModule,
    FormsModule,
    ProgressBarModule,
    CreateProjectDialogComponent,
    ButtonModule,
    ProjectsNotFoundComponent,
    ScrollerModule,
    InfiniteScrollDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  protected store = inject(Store);

  isShownCreateProjectDialog = signal(false);
  projects: Signal<Project[]> = this.store.projects;

  ngOnInit(): void {
    this.store.updateSearchRequest(defaultProjectSearchRequest);
    this.store.loadProjects(this.store.searchProjectsRequest);
  }

  searchProject(request: ProjectSearchRequest): void {
    this.store.updateSearchRequest(request);
  }

  createProject($event: CreateProjectRequest): void {
    this.store.createProject($event);
  }

  loadMoreItems() {
    this.store.updateSearchRequest({
      skip: this.projects().length,
      take: 5,
      isPagination: true,
    });
  }
}
