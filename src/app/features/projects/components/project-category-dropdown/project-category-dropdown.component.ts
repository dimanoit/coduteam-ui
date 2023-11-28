import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProjectCategory } from '../project-card/project-category/project-category.enum';

@Component({
  selector: 'app-project-category-dropdown',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./project-category-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectCategoryDropdownComponent),
      multi: true,
    },
  ],
  template: ` <p-dropdown
    [options]="categories"
    [formControl]="formControl"
    placeholder="Category"
    (onChange)="onDropdownChange($event)"
  ></p-dropdown>`,
})
export class ProjectCategoryDropdownComponent
  implements OnInit, ControlValueAccessor
{
  formControl = new FormControl();
  categories!: SelectItem[];

  private onChange: any = () => {};
  private onTouched: any = () => {};

  ngOnInit(): void {
    this.categories = Object.values(ProjectCategory).map((category) => ({
      label: category,
      value: category,
    }));
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      console.log(obj);
      this.formControl.setValue(obj);
    }
  }

  onDropdownChange(event: any): void {
    this.writeValue(event.value);
    this.onChange(event.value);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
