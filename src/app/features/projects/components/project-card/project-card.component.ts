import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../models/project.interface';
import { Router } from '@angular/router';
import { ProjectCategoryComponent } from './project-category/project-category.component';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

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

  constructor(private router: Router) {}

  getImageUrl(): string {
    return 'https://source.unsplash.com/random/200x200?sig=' + this.project.id;
  }

  viewProjectDetails(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }
}
