import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from '../../../../shared/components/not-found-page/not-found-page.component';
import { ProjectService } from '../../services/project.service';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProjectLineComponent } from '../../components/project-line/project-line.component';
import { CardModule } from 'primeng/card';
import { ProjectParticipantComponent } from '../../components/project-participant/project-participant.component';
import { PositionLineComponent } from '../../../positions/components/position-line/position-line.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { State } from '../../../../state';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-project-page',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  standalone: true,
  providers: [ProjectService, PositionService],
  imports: [
    CommonModule,
    NotFoundPageComponent,
    ProgressBarModule,
    ProjectLineComponent,
    CardModule,
    ProjectParticipantComponent,
    PositionLineComponent,
    ScrollPanelModule,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  projectService = inject(ProjectService);
  positionService = inject(PositionService);
  state = inject(State);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

  isUserOwnerOfProject = signal(false);

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => params['projectId']),
        filter((value) => value),
        switchMap((projectId: number) =>
          this.loadProjectAndPositions(projectId),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private loadProjectAndPositions(projectId: number) {
    this.positionService
      .loadPositions({ projectId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    return this.projectService.loadSelectedProject(projectId).pipe(
      tap(() => this.setIsUserOwnerOfProject()),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  setIsUserOwnerOfProject() {
    // TODO figure out why state is undefined
    const isUserOwnerOfProject =
      this.state.user.currentUser()?.userId ===
      this.state.project.selected()?.ownerId;

    this.isUserOwnerOfProject.set(isUserOwnerOfProject);
  }
}
