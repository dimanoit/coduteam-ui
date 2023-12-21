import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  imports: [
    ProjectCardComponent,
    CommonModule,
    ProjectsFilterComponent,
    PaginatorModule,
    ToggleButtonModule,
    ProjectLineComponent,
  ],
  providers: [ProjectService],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;
  isCardView: boolean = false;

  first: number = 0;
  rows: number = 9;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
    //this.projectService.getProjects().subscribe((p) => (this.projects = p));
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
