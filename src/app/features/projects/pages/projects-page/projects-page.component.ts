import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
import { Subject, switchMap } from 'rxjs';
import { ProjectSearchRequest } from '../../models/project-search-request.interface';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';
import { ButtonModule } from 'primeng/button';
import { CreateProjectRequest } from '../../models/create-project.interface';
import { ProjectsNotFoundComponent } from '../../components/projects-not-found/projects-not-found.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  imports: [
    ProjectCardComponent,
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
  providers: [ProjectService],
  standalone: true,
})
export class ProjectsPageComponent implements OnInit {
  isCardView = signal(false);
  isShownCreateProjectDialog = signal(false);

  lastIdx = computed(() => this.state.project.data().length);
  lastIdxSent = 0;

  private cancelPrevious = new Subject<void>();
  private destroyRef = inject(DestroyRef);
  private projectService = inject(ProjectService);
  protected state = inject(State);

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

  createProject($event: CreateProjectRequest) {
    this.projectService
      .createProject($event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
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
