import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
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
import { ActivationComponent } from '../../components/activation/activation.component';
import { State } from '../../../../state';

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
    ActivationComponent,
  ],
  providers: [UserService],
  standalone: true,
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;

  isSignUp = signal(false);
  isLoading = signal(false);
  isActivation = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    protected state: State,
  ) {
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
        this.isSignUp.set(true);
      }
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this.isLoading.set(true);
    const authDto: AuthDto = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    let authObs$ = this.isSignUp()
      ? this.userService
          .register(authDto)
          .pipe(concatMap(() => this.authService.login(authDto)))
      : this.authService.login(authDto);

    authObs$.subscribe({
      next: () => this.onSuccess(),
      error: () => this.cleanOnError(),
    });
  }

  switchAuth() {
    this.isSignUp.set(!this.isSignUp());
  }

  private cleanOnError() {
    this.authForm.reset();

    this.isLoading.set(false);
  }

  private onSuccess() {
    this.isLoading.set(false);

    if (this.isSignUp()) {
      this.isActivation.set(true);
      return;
    }

    this.router.navigate(['/projects']);
  }

  activateUser(data: AccountRegistrationDto) {
    this.userService
      .finishRegistration(data)
      .subscribe(() => this.router.navigate(['/projects']));
  }
}
