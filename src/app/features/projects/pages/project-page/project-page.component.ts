import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
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
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { State } from '../../../../state';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreatePositionDialogComponent } from '../../../positions/components/create-position-dialog/create-position-dialog.component';
import { CreatePositionRequest } from '../../../positions/models/create-position-request.interface';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
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
    CreatePositionDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
  projectService = inject(ProjectService);
  positionService = inject(PositionService);
  state = inject(State);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);
  isShownDialog: boolean = false;

  isUserOwnerOfProject = computed(
    () =>
      this.state.project.selectedProject()?.ownerId ===
      this.state.user.currentUser()?.id,
  );

  selectedProject = computed(() => this.state.project.selectedProject());

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
    this.state.project.loadSelectedProject(projectId);

    return this.positionService
      .loadPositions({ projectId, withApplicationStatus: true })
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  createPosition(position: CreatePositionRequest) {
    position.projectId = this.state.project.selectedProject()?.id!;
    this.isShownDialog = false;
    this.positionService
      .createPosition(position)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  removePosition(positionId: number) {
    this.positionService
      .removePosition(positionId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
