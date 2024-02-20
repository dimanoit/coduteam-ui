import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectsFilterComponent } from '../../components/projects-filter/projects-filter.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { ProjectService } from '../../services/project.service';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule } from '@angular/forms';
import { State } from '../../../../state';
import { ProgressBarModule } from 'primeng/progressbar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Subject, switchMap, tap } from 'rxjs';
import { ProjectSearchRequest } from '../../models/project-search-request.interface';

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
    ProgressBarModule,
  ],
  providers: [ProjectService],
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  isCardView: boolean = false;
  lastIdx = computed(() => this.state.project.data().length);
  lastIdxSent = 0;
  destroyRef = inject(DestroyRef);
  private cancelPrevious = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    protected state: State,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;

    if (
      element.scrollHeight - element.scrollTop === element.clientHeight &&
      this.lastIdxSent !== this.lastIdx()
    ) {
      this.loadProjects({ skip: this.lastIdx(), take: 5 }, true);

      this.lastIdxSent = this.lastIdx();
    }
  }

  searchProject($event: ProjectSearchRequest) {
    this.cancelPrevious.next();
    this.loadProjects($event);
  }

  private loadProjects(
    request?: ProjectSearchRequest,
    withJoin: boolean = false,
  ): void {
    this.state.startLoading();
    this.projectService
      .loadProjects(request, withJoin)
      .pipe(
        switchMap(() => this.cancelPrevious),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
