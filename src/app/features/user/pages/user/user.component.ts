import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsComponent } from '../../../projects/pages/projects/projects.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProjectService } from '../../../projects/services/project.service';
import { Observable } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { ProjectLineComponent } from '../../../projects/components/project-line/project-line.component';
import { User } from '../../models/user.interface';
import { ProjectState } from '../../../projects/state/project.state';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
  ],
  providers: [
    MessageService,
    ProjectService,
    UserService,
    PositionService,
    ProjectState,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    protected projectState: ProjectState,
  ) {}

  user$!: Observable<User>;

  ngOnInit(): void {
    this.projectService
      .loadProjects({
        onlyRelatedToCurrentUser: true,
      })
      .subscribe();

    this.user$ = this.userService.getCurrentUser();
  }
}
