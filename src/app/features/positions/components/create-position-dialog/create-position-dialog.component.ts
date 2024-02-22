import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectCategoryDropdownComponent } from '../../../projects/components/project-category-dropdown/project-category-dropdown.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectItem, SharedModule } from 'primeng/api';
import { CreateProjectRequest } from '../../../projects/models/create-project.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { CreatePositionRequest } from '../../models/create-position-request.interface';
import { PositionCategory } from '../../models/position-category.enum';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-position-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ProjectCategoryDropdownComponent,
    ReactiveFormsModule,
    SharedModule,
    CheckboxModule,
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './create-position-dialog.component.html',
  styleUrl: './create-position-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePositionDialogComponent {
  private formBuilder = inject(FormBuilder);

  @Input() isShown = false;
  @Output() closedDialog = new EventEmitter<void>();
  @Output() createPosition = new EventEmitter<CreatePositionRequest>();

  positionForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    isRemote: false,
    deadline: ['', Validators.required],
    category: ['', Validators.required],
  });

  onCreateClick(): void {
    if (this.positionForm.invalid) {
      alert('Form is invalid');
    }

    const request = this.positionForm.value as CreatePositionRequest;
    request.isRemote = this.positionForm.value['isRemote'][0] === 'true';
    this.createPosition.emit(request);

    this.closeDialog();
  }

  closeDialog(): void {
    this.closedDialog.emit();
  }

  specialities: SelectItem[] = Object.keys(PositionCategory).map(
    (categoryKey): SelectItem => ({
      label: PositionCategory[categoryKey as keyof typeof PositionCategory],
      value: categoryKey,
    }),
  );
}
