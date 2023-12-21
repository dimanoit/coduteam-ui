import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsComponent } from '../../../projects/pages/projects/projects.component';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
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
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ProjectsComponent,
    FileUploadModule,
    ToastModule,
    PanelModule,
    ProjectLineComponent,
    NgFor,
  ],
  providers: [MessageService, ProjectService, UserService, PositionService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  messageService = inject(MessageService);
  projectService = inject(ProjectService);
  positionService = inject(PositionService);

  user$!: Observable<User>;
  projects$!: Observable<Project[]>;
  positions$!: Observable<PositionDto[]>;
  uploadedFiles: any[] = [];

  ngOnInit(): void {
    this.user$ = this.userService.getCurrentUser();
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
  }

  onUpload(event: FileUploadEvent) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
