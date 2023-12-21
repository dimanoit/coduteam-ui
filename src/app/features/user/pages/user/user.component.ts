import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsComponent } from '../../../projects/pages/projects/projects.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ProjectService } from '../../../projects/services/project.service';
import { Observable, switchMap } from 'rxjs';
import { PositionService } from '../../../positions/services/position.service';
import { ProjectLineComponent } from '../../../projects/components/project-line/project-line.component';
import { User } from '../../models/user.interface';
import { Project } from '../../../projects/models/project.interface';
import { PositionDto } from '../../../positions/models/position-dto.interface';

@Component({
  selector: 'app-user',
  imports: [
    AvatarModule,
    ProjectsComponent,
    CommonModule,
    ToastModule,
    PanelModule,
    ProjectLineComponent,
  ],
  providers: [MessageService, ProjectService, UserService, PositionService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private positionService: PositionService,
  ) {}

  user$!: Observable<User>;
  projects$!: Observable<Project[]>;
  positions$!: Observable<PositionDto[]>;

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects({
      onlyRelatedToCurrentUser: true,
    });

    this.positions$ = this.projects$.pipe(
      switchMap((projects) =>
        this.positionService.getPositions({
          projectsIds: projects.map((p) => p.id),
        }),
      ),
    );

    this.user$ = this.userService.getCurrentUser();
  }
}
