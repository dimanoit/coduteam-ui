import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProjectCategoryDropdownComponent } from '../../../projects/components/project-category-dropdown/project-category-dropdown.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectItem, SharedModule } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { CreatePositionRequest } from '../../models/create-position-request.interface';
import { PositionCategory } from '../../models/position-category.enum';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule, EditorTextChangeEvent } from 'primeng/editor';

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
    EditorModule,
    FormsModule,
  ],
  templateUrl: './create-position-dialog.component.html',
  styleUrl: './create-position-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class CreatePositionDialogComponent {
  private formBuilder = inject(FormBuilder);

  @Input() isShown = true;
  @Output() closedDialog = new EventEmitter<void>();
  @Output() createPosition = new EventEmitter<CreatePositionRequest>();

  description: string = '';
  positionForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    category: ['', Validators.required],
    isRemote: false,
    deadline: [null],
  });

  onCreateClick(): void {
    if (this.positionForm.invalid || this.description.length <= 0) {
      alert('Form is invalid');
    }

    const request = this.positionForm.value as CreatePositionRequest;
    request.isRemote = this.positionForm.value['isRemote'][0] === 'true';
    request.description = this.description;
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

  updateDescription($event: EditorTextChangeEvent) {
    console.log($event);
    this.description = $event.htmlValue;
  }
}
