import { Component, computed, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { ProjectService } from '../../services/project.service';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { State } from '../../../../state';

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
  providers: [ProjectService, State],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  isCardView: boolean = false;
  lastIdx = computed(() => this.state.project.data().length);
  lastIdxSent = 0;

  constructor(
    private projectService: ProjectService,
    protected state: State,
  ) {}

  ngOnInit(): void {
    this.projectService.loadProjects().subscribe();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      this.lastIdxSent !== this.lastIdx()
    ) {
      this.projectService
        .loadProjects({ skip: this.lastIdx(), take: 5 }, true)
        .subscribe();

      this.lastIdxSent = this.lastIdx();
    }
  }
}
