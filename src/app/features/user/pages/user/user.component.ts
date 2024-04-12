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
import { Store } from '../../../../store/store';

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
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  store = inject(Store);

  projects = this.store.projects;
  myApplications = this.store.myApplications;
  user = this.store.currentUser;

  ngOnInit(): void {
    this.store.updateSearchRequest({ onlyRelatedToCurrentUser: true });
    this.store.loadProjects(this.store.searchProjectsRequest);
    this.store.loadMyApplications();
  }
}
