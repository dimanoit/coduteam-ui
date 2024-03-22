import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsPageComponent } from '../../../projects/pages/projects-page/projects-page.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProjectService } from '../../../projects/services/project.service';
import { PositionService } from '../../../positions/services/position.service';
import { ProjectLineComponent } from '../../../projects/components/project-line/project-line.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PositionApplyService } from '../../../positions/services/position-apply.service';
import { State } from '../../../../store/state';
import { PositionLineComponent } from '../../../positions/components/position-line/position-line.component';
import { UserState } from '../../../../store/user.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user',
  imports: [
    AvatarModule,
    ProjectsPageComponent,
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
    UserState,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  state = inject(State);
  destroyRef = inject(DestroyRef);

  currentUser = computed(() => this.state.user.currentUser());
  projects = this.state.project.projects;
  myApplications = this.state.position.myApplications;

  ngOnInit(): void {
    this.state.project.updateSearchRequest({ onlyRelatedToCurrentUser: true });
    this.state.project.loadProjects(this.state.project.searchRequest);
    this.state.position.loadMyApplications();

    this.userService
      .loadCurrentUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
