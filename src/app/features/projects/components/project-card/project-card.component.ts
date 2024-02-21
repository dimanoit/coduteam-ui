import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Project } from '../../models/project.interface';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { truncateString } from '../../../../shared/utils/utilities';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  imports: [ProjectCategoryComponent, ButtonModule, NgIf],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input() project!: Project;
  private router = inject(Router);

  private maxDescriptionSize = 200;
  private maxTitleSize = 26;

  get description(): string | undefined {
    return truncateString(this.project?.description, this.maxDescriptionSize);
  }

  get title(): string | undefined {
    return truncateString(this.project?.title, this.maxTitleSize);
  }

  navigateToProject(): void {
    this.router.navigateByUrl(`/projects/${this.project?.id}`);
  }
}
