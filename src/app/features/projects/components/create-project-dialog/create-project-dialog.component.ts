import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ProjectCategoryDropdownComponent } from '../project-category-dropdown/project-category-dropdown.component';
import { CreateProjectRequest } from '../../models/create-project.interface';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    DialogModule,
    ProjectCategoryDropdownComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CreateProjectDialogComponent {
  private formBuilder = inject(FormBuilder);

  @Input() isShown = false;
  @Output() closedDialog = new EventEmitter<void>();
  @Output() createProject = new EventEmitter<CreateProjectRequest>();

  projectForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(26)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    category: [null, Validators.required],
    country: [null],
    projectImgUrl: [''],
  });

  onCreateClick() {
    if (this.projectForm.invalid) {
      alert('Form is invalid');
    }

    const request = this.projectForm.value as CreateProjectRequest;
    this.createProject.emit(request);

    this.closeDialog();
  }

  closeDialog() {
    this.closedDialog.emit();
  }
}
