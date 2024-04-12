import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Project } from '../../models/project.interface';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { truncateString } from '../../../../shared/utils/utilities';

@Component({
  selector: 'app-project-line',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule, NgFor, ButtonModule],
  templateUrl: './project-line.component.html',
  styleUrl: './project-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectLineComponent {
  @Input() project?: Project;
  @Input() isRemovable: boolean = false;

  @Output() onRemoveProject = new EventEmitter<number>();

  private router = inject(Router);
  private maxDescriptionSize = 200;
  private maxTitleSize = 26;

  get description(): string | undefined {
    return truncateString(this.project?.description, this.maxDescriptionSize);
  }

  get title(): string | undefined {
    return truncateString(this.project?.title, this.maxTitleSize);
  }

  removeProject() {
    if (!this.project?.id) {
      return;
    }

    this.onRemoveProject.emit(this.project.id);
  }

  async navigateToProject() {
    await this.router.navigateByUrl(`/projects/${this.project?.id}`);
  }
}
