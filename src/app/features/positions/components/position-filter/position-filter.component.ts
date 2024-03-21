import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ProjectCategoryDropdownComponent } from '../../../projects/components/project-category-dropdown/project-category-dropdown.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PositionCategory } from '../../models/position-category.enum';
import { debounceTime, filter, switchMap } from 'rxjs';
import { PositionService } from '../../services/position.service';
import { PositionSearchRequest } from '../../models/position-search-request.interface';
import { SelectItem } from 'primeng/api';
import { ProjectCategory } from '../../../projects/models/project.interface';

@Component({
  selector: 'app-position-filter',
  templateUrl: './position-filter.component.html',
  styleUrls: ['./position-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProjectCategoryDropdownComponent,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
})
export class PositionFilterComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private positionService = inject(PositionService);

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      projectCategory: [ProjectCategory.None],
      term: ['', [Validators.maxLength(26)]],
      positionCategory: [''],
      applicationStatus: [''],
    });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        filter(() => this.searchForm.valid),
        switchMap(() => this.search()),
      )
      .subscribe();
  }

  search() {
    const request = this.searchForm.value as PositionSearchRequest;
    return this.positionService.loadPositions(request);
  }

  specialities: SelectItem[] = Object.keys(PositionCategory).map(
    (categoryKey): SelectItem => ({
      label: PositionCategory[categoryKey as keyof typeof PositionCategory],
      value: categoryKey,
    }),
  );
}
