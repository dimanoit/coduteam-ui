import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ProjectsComponent } from '../../../projects/pages/projects/projects.component';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';

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
  ],
  providers: [MessageService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  userService = inject(UserService);
  messageService = inject(MessageService);
  currentUser$ = this.userService.getUser$();
  uploadedFiles: any[] = [];

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
