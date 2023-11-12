import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProjectCategory } from '../project-card/project-category/project-category.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss'],
})
export class CreateProjectDialogComponent {
  @Input() isShown: boolean = false;
  @Output() close = new EventEmitter<void>();

  projectForm!: FormGroup;
  categories!: SelectItem[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(26)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      category: [null, Validators.required],
      imageSrc: [''],
    });

    this.categories = Object.values(ProjectCategory).map((cat) => ({
      label: cat,
      value: cat,
    }));
  }

  onCreateClick() {
    if (this.projectForm.valid) {
      alert('TODO: implement please backend');
      this.closeDialog();
    } else {
      alert('Form is invalid');
    }
  }

  closeDialog() {
    this.close.emit();
  }
}
