import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProjectCategory } from './project-category.enum';

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCategoryComponent {
  @Input() category!: ProjectCategory;
}
