import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
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
import { ProjectService } from '../../services/project.service';
import { ProjectSearchRequest } from '../../models/project-search-request.interface';
import { debounceTime, filter, map, switchMap } from 'rxjs';

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

  @Output() onFilterChange = new EventEmitter<ProjectSearchRequest>();
  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      category: [ProjectCategory.None, Validators.required],
      term: ['', [Validators.maxLength(26)]],
    });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(600),
        filter(() => this.searchForm.valid),
        map(() => this.search()),
      )
      .subscribe();
  }

  search(): void {
    const request = this.searchForm.value as ProjectSearchRequest;
    this.onFilterChange.emit(request);
  }
}
