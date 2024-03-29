import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AccountRegistrationDto, Gender } from '../../models/user.interface';
import { DateInputComponent } from '../date-input/date-input.component';

@Component({
  selector: 'app-activation',
  standalone: true,
  imports: [
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    DateInputComponent,
  ],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivationComponent implements OnInit {
  finishRegistrationForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  genders: GenderCode[] | undefined;

  @Output() onUserActivation = new EventEmitter<AccountRegistrationDto>();
  isLoading = signal(false);

  ngOnInit(): void {
    this.genders = [
      { name: 'Male', code: Gender.Male },
      { name: 'Female', code: Gender.Female },
      { name: 'Non binary', code: Gender.NonBinary },
    ];

    this.finishRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      date: ['', Validators.required],
      gender: new FormControl<GenderCode | null>(null),
    });
  }

  onRegistrationFinish() {
    if (!this.finishRegistrationForm.valid) {
      return;
    }

    this.isLoading.set(true);
    const finishRegistrationDto: AccountRegistrationDto = {
      firstName: this.finishRegistrationForm.value.firstName,
      lastName: this.finishRegistrationForm.value.lastName,
      dateOfBirth: this.finishRegistrationForm.value.date,
      gender: this.finishRegistrationForm.value.gender.code,
    };

    this.onUserActivation.emit(finishRegistrationDto);
  }

  onDateInput(date: Date) {
    this.finishRegistrationForm.patchValue({
      date: date,
    });
  }
}

interface GenderCode {
  name: string;
  code: string;
}
