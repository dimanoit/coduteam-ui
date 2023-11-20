import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCategoryDropdownComponent } from '../../../projects/components/project-category-dropdown/project-category-dropdown.component';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCategoryDropdownComponent],
})
export class PositionFilterComponent {}
