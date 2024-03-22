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
import { Store } from '../../../../store/store';

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
  isLoading = inject(Store).isLoading;

  store = inject(Store);

  isUserOwnerOfProject = computed(
    () =>
      this.store.selectedProject()?.ownerId === this.store.currentUser()?.id,
  );

  selectedProject = computed(() => this.store.selectedProject());

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
    this.store.loadSelectedProject(projectId);
    this.store.loadPositions({
      projectId,
      withApplicationStatus: true,
    });
  }

  createPosition(position: CreatePositionRequest) {
    position.projectId = this.store.selectedProject()?.id!;
    this.isShownDialog = false;
    this.store.createPosition(position);
  }
}
