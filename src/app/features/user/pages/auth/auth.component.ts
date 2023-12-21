import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AccountRegistrationDto,
  AuthDto,
  Gender,
} from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { concatMap } from 'rxjs';
import { passwordValidator } from '../../validators/password.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DividerModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [UserService],
  standalone: true,
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  finishRegistrationForm: FormGroup;
  genders: GenderCode[] | undefined;

  isSignUp = false;
  isLoading = false;
  isActivation = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.genders = [
      { name: 'Male', code: Gender.Male },
      { name: 'Female', code: Gender.Female },
      { name: 'Non binary', code: Gender.NonBinary },
    ];

    this.finishRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      date: new FormControl<Date | null>(null),
      gender: new FormControl<GenderCode | null>(null),
    });

    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator],
      ],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (+type === 1) {
        this.isSignUp = true;
      }
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading = true;
    const authDto: AuthDto = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    let authObs$ = this.isSignUp
      ? this.userService
          .register(authDto)
          .pipe(concatMap(() => this.authService.login(authDto)))
      : this.authService.login(authDto);

    authObs$.subscribe({
      next: () => this.onSuccess(),
      error: () => this.cleanOnError(),
    });
  }

  onRegistrationFinish() {
    if (!this.finishRegistrationForm.valid) {
      return;
    }

    this.isLoading = true;
    const finishRegistrationDto: AccountRegistrationDto = {
      firstName: this.finishRegistrationForm.value.firstName,
      lastName: this.finishRegistrationForm.value.lastName,
      dateOfBirth: this.finishRegistrationForm.value.date,
      gender: this.finishRegistrationForm.value.gender.code,
    };

    this.userService
      .finishRegistration(finishRegistrationDto)
      .subscribe(() => this.router.navigate(['/projects']));
  }

  private cleanOnError() {
    this.authForm.reset();

    this.isLoading = false;
  }

  private onSuccess() {
    this.isLoading = false;

    if (this.isSignUp) {
      this.isActivation = true;
      return;
    }

    this.router.navigate(['/projects']);
  }
}

interface GenderCode {
  name: string;
  code: string;
}
