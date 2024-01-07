import { Component, computed, OnInit } from '@angular/core';
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
  lastIdx = computed(() => projectState.projects().length);
  lastIdxSent = 0;

  protected readonly projectState = projectState;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.loadProjects().subscribe();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    console.log(this.lastIdxSent);
    console.log(this.lastIdx());

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
