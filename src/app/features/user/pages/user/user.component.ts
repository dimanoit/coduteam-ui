import {
  ChangeDetectionStrategy,
  Component,
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
import { PositionLineComponent } from '../../../positions/components/position-line/position-line.component';
import { UserStore } from '../../../../store/user.store';
import { ProjectStore } from '../../../../store/project.store';
import { PositionStore } from '../../../../store/position.store';

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
    UserStore,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  projectStore = inject(ProjectStore);
  positionStore = inject(PositionStore);
  userStore = inject(UserStore);

  projects = this.projectStore.projects;
  myApplications = this.positionStore.myApplications;
  user = this.userStore.currentUser;

  ngOnInit(): void {
    this.projectStore.updateSearchRequest({ onlyRelatedToCurrentUser: true });
    this.projectStore.loadProjects(this.projectStore.searchRequest);
    this.positionStore.loadMyApplications();
    this.userStore.loadCurrentUser();
  }
}
