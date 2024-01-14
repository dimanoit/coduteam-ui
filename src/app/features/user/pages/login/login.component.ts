import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivationComponent } from '../../components/activation/activation.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../../../../state';
import { passwordValidator } from '../../validators/password.validator';
import { AuthDto } from '../../models/user.interface';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ActivationComponent,
    ButtonModule,
    DividerModule,
    InputTextModule,
    PaginatorModule,
    PasswordModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = this.state.user.isLoading;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    protected state: State,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator],
      ],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const authDto: AuthDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService
      .login(authDto)
      .pipe(
        tap(() => this.router.navigate(['/projects'])),
        finalize(() => this.loginForm.reset()),
      )
      .subscribe();
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }
}
