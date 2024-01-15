import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivationComponent } from '../../components/activation/activation.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { State } from '../../../../state';
import { AccountRegistrationDto, AuthDto } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../../validators/password.validator';
import { concatMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ActivationComponent,
    ButtonModule,
    ReactiveFormsModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  authForm!: FormGroup;

  protected state = inject(State);
  private userService = inject(UserService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator],
      ],
    });
  }

  activateUser(data: AccountRegistrationDto) {
    this.userService
      .finishRegistration(data)
      .subscribe(() => this.router.navigate(['/projects']));
  }

  protected redirectToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const authDto: AuthDto = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.userService
      .register(authDto)
      .pipe(concatMap(() => this.authService.login(authDto)))
      .subscribe();
  }
}
