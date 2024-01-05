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
import { ProjectService } from '../../services/project.service';
import { CreateProjectRequest } from '../../models/create-project.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

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
  providers: [ProjectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CreateProjectDialogComponent {
  private formBuilder = inject(FormBuilder);
  private projectService = inject(ProjectService);

  @Input() isShown = false;
  @Output() closedDialog = new EventEmitter<void>();

  projectForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(26)]],
    description: ['', [Validators.required, Validators.maxLength(250)]],
    category: [null, Validators.required],
    country: [null],
    projectImgUrl: [''],
  });

  onCreateClick() {
    if (this.projectForm.valid) {
      const request = this.projectForm.value as CreateProjectRequest;

      debugger;
      this.projectService
        .createProject(request)
        .pipe(
          catchError(() => {
            alert('Error happened');
            return EMPTY;
          }),
          finalize(() => this.closeDialog()),
        )
        .subscribe();
    } else {
      alert('Form is invalid');
    }
  }

  closeDialog() {
    this.closedDialog.emit();
  }
}
