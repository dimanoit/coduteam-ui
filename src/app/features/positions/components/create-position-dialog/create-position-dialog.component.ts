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
import { SharedModule } from 'primeng/api';
import { CreateProjectRequest } from '../../../projects/models/create-project.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

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
  ],
  templateUrl: './create-position-dialog.component.html',
  styleUrl: './create-position-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePositionDialogComponent {
  private formBuilder = inject(FormBuilder);

  @Input() isShown = false;
  @Output() closedDialog = new EventEmitter<void>();
  @Output() createProject = new EventEmitter<CreateProjectRequest>();

  positionForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    shortDescription: ['', [Validators.required, Validators.maxLength(250)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    isRemote: [false, Validators.required],
    deadline: ['', Validators.required],
  });

  onCreateClick(): void {
    if (this.positionForm.invalid) {
      alert('Form is invalid');
    }

    const request = this.positionForm.value as CreateProjectRequest;
    this.createProject.emit(request);

    this.closeDialog();
  }

  closeDialog(): void {
    this.closedDialog.emit();
  }
}
