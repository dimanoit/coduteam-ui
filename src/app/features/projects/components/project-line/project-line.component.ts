import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Project } from '../../models/project.interface';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-project-line',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, NgFor],
  templateUrl: './project-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLineComponent {
  @Input() project?: Project;
}
