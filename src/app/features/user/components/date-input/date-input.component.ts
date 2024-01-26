import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [PaginatorModule, ReactiveFormsModule],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  monthes = this.getMonths();
  dateBirthForm!: FormGroup;

  @Input() isFormSubmitted = false;
  @Output() onDateInput = new EventEmitter<Date>();

  isValidFullDate = signal(false);

  ngOnInit(): void {
    this.dateBirthForm = this.formBuilder.group({
      day: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      month: ['', [Validators.required]],
      year: [
        null,
        [Validators.required, Validators.max(2010), Validators.min(1900)],
      ],
    });

    this.dateBirthForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.onDateChange();
    });
  }

  private onDateChange() {
    const date = this.dateBirthForm.value;
    const isValidDate = this.isValidDate(date.year, date.month.code, date.day);

    if (isValidDate) {
      this.onDateInput.emit(new Date(date.year, date.month.code, date.day));
    }

    this.isValidFullDate.set(isValidDate);
  }

  private isValidDate(year: number, month: number, day: number): boolean {
    const isValidMonth = month >= 1 && month <= 12;
    const isValidYear = year >= 1900 && year <= 2010;

    if (!isValidMonth || !isValidYear) {
      return false;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
  }

  private getMonths() {
    return [
      { name: 'January', code: 0 },
      { name: 'February', code: 1 },
      { name: 'March', code: 2 },
      { name: 'April', code: 3 },
      { name: 'May', code: 4 },
      { name: 'June', code: 5 },
      { name: 'July', code: 6 },
      { name: 'August', code: 7 },
      { name: 'September', code: 8 },
      { name: 'October', code: 9 },
      { name: 'November', code: 10 },
      { name: 'December', code: 11 },
    ];
  }
}
