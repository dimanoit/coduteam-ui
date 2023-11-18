import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
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
  standalone: true,
})
export class CreateProjectDialogComponent {
  private formBuilder = inject(FormBuilder);
  @Input() isShown = false;
  @Output() closedDialog = new EventEmitter<void>();

  projectForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(26)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    category: [null, Validators.required],
    imageSrc: [''],
  });

  onCreateClick() {
    if (this.projectForm.valid) {
      alert('TODO: implement please backend');
      this.closeDialog();
    } else {
      alert('Form is invalid');
    }
  }

  closeDialog() {
    this.closedDialog.emit();
  }
}
