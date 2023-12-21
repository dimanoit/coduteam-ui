import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';
import { Observable, of, tap } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [
    ProjectCardComponent,
    CommonModule,
    ProjectsFilterComponent,
    PaginatorModule,
    ToggleButtonModule,
    ProjectLineComponent,
    SkeletonModule,
  ],
  providers: [ProjectService],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;
  isCardView: boolean = false;

  first: number = 0;
  rows: number = 9;
  isLoading: boolean = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService
      .getProjects()
      .pipe(tap(() => (this.isLoading = false)));
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? this.first;
    this.rows = event.rows ?? this.rows;
  }
}

export interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
