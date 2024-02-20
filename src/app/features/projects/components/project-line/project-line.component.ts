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
    return this.truncateString(
      this.project?.description,
      this.maxDescriptionSize,
    );
  }

  get title(): string | undefined {
    return this.truncateString(this.project?.title, this.maxTitleSize);
  }

  removeProject() {
    if (!this.project?.id) {
      return;
    }

    this.onRemoveProject.emit(this.project.id);
  }

  navigateToProject(): void {
    this.router.navigateByUrl(`/projects/${this.project?.id}`);
  }

  private truncateString(
    str: string | undefined,
    maxLength: number,
  ): string | undefined {
    return str?.length !== undefined && str.length > maxLength
      ? `${str.slice(0, maxLength)}...`
      : str;
  }
}
