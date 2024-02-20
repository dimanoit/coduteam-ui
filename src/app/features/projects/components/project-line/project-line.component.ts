import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Project } from '../../models/project.interface';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProjectService } from '../../services/project.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project-line',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, NgFor, ButtonModule],
  templateUrl: './project-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLineComponent {
  @Input() project?: Project;
  @Input() isRemovable: boolean = false;

  protected projectService = inject(ProjectService);

  removeProject() {
    if (!this.project?.id) {
      return;
    }

    this.projectService.remove(this.project.id).subscribe();
  }
}
