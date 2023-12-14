import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectCategory } from '../project-card/project-category/project-category.enum';
import { ProjectCategoryDropdownComponent } from '../project-category-dropdown/project-category-dropdown.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-projects-filter',
  standalone: true,
  imports: [
    ProjectCategoryDropdownComponent,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsFilterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      category: [ProjectCategory.None, Validators.required],
      term: ['', [Validators.required, Validators.maxLength(26)]],
    });
  }

  search() {}
}
