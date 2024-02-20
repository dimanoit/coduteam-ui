import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsComponent } from '../../../projects/pages/projects/projects.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProjectService } from '../../../projects/services/project.service';
import { finalize, forkJoin, Observable } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { ProjectLineComponent } from '../../../projects/components/project-line/project-line.component';
import { ProjectState } from '../../../projects/state/project.state';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PositionApplyService } from '../../../positions/services/position-apply.service';
import { State } from '../../../../state';
import { PositionLineComponent } from '../../../positions/components/position-line/position-line.component';
import { UserState } from '../../user.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user',
  imports: [
    AvatarModule,
    ProjectsComponent,
    CommonModule,
    ToastModule,
    PanelModule,
    ProjectLineComponent,
    ScrollPanelModule,
    PositionLineComponent,
  ],
  providers: [
    PositionApplyService,
    MessageService,
    ProjectService,
    UserService,
    PositionService,
    ProjectState,
    UserState,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  projectService = inject(ProjectService);
  state = inject(State);
  destroyRef = inject(DestroyRef);
  positionApplyService = inject(PositionApplyService);

  ngOnInit(): void {
    const requests$ = this.getPageRequests();
    this.state.startLoading();

    forkJoin(requests$)
      .pipe(
        finalize(() => this.state.endLoading()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private getPageRequests(): Observable<void>[] {
    const userRequest$ = this.userService
      .loadCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef));

    const projectsRequest$ = this.projectService
      .loadProjects({
        onlyRelatedToCurrentUser: true,
      })
      .pipe(takeUntilDestroyed(this.destroyRef));

    const positionRequest$ = this.positionApplyService
      .loadMyApplications()
      .pipe(takeUntilDestroyed(this.destroyRef));
    return [userRequest$, projectsRequest$, positionRequest$];
  }
}
