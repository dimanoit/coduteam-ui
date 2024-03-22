import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
import { ProjectStore } from '../../../../store/project.store';

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
  ],
  standalone: true,
})
export class ProjectsPageComponent implements OnInit {
  protected projectStore = inject(ProjectStore);

  isShownCreateProjectDialog = signal(false);
  projects = computed(() => this.projectStore.projects());

  ngOnInit(): void {
    this.projectStore.updateSearchRequest({ skip: 0, take: 10 });
    this.projectStore.loadProjects(this.projectStore.searchRequest);
  }

  searchProject(request: ProjectSearchRequest): void {
    this.projectStore.updateSearchRequest(request);
  }

  createProject($event: CreateProjectRequest): void {
    this.projectStore.createProject($event);
  }
}
