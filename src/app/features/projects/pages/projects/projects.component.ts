import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { ProjectService } from '../../services/project.service';
import { SkeletonModule } from 'primeng/skeleton';
import { projectState } from '../../state/project.state';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  imports: [
    ProjectCardComponent,
    CommonModule,
    ProjectsFilterComponent,
    ToggleButtonModule,
    ProjectLineComponent,
    SkeletonModule,
    FormsModule,
  ],
  providers: [ProjectService],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  isCardView: boolean = false;
  protected readonly projectState = projectState;

  first: number = 0;
  rows: number = 9;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.loadProjects().subscribe();
  }
}
