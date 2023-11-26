import { Component } from '@angular/core';
import { mockedData } from '../../../../../mocks/mock_projects';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';

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
  standalone: true,
})
export class ProjectsComponent {
  projects = mockedData;
  isCardView: boolean = false;

  first: number = 0;
  rows: number = 10;

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
