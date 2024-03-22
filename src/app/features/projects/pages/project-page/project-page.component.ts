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
import { filter, map, tap } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { ButtonModule } from 'primeng/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreatePositionDialogComponent } from '../../../positions/components/create-position-dialog/create-position-dialog.component';
import { CreatePositionRequest } from '../../../positions/models/create-position-request.interface';
import { ProjectStore } from '../../../../store/project.store';
import { UserStore } from '../../../../store/user.store';
import { PositionStore } from '../../../../store/position.store';
import { GlobalStore } from '../../../../store/state';

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
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);
  isShownDialog: boolean = false;
  isLoading = inject(GlobalStore).isLoading;

  projectStore = inject(ProjectStore);
  positionStore = inject(PositionStore);
  userStore = inject(UserStore);

  isUserOwnerOfProject = computed(
    () =>
      this.projectStore.selectedProject()?.ownerId ===
      this.userStore.currentUser()?.id,
  );

  selectedProject = computed(() => this.projectStore.selectedProject());

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => params['projectId']),
        filter((value) => value),
        tap((projectId: number) => this.loadProjectAndPositions(projectId)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private loadProjectAndPositions(projectId: number) {
    this.projectStore.loadSelectedProject(projectId);
    this.positionStore.loadPositions({
      projectId,
      withApplicationStatus: true,
    });
  }

  createPosition(position: CreatePositionRequest) {
    position.projectId = this.projectStore.selectedProject()?.id!;
    this.isShownDialog = false;
    this.positionStore.createPosition(position);
  }
}
