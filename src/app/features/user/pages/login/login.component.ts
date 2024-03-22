import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { Router } from '@angular/router';
import { State } from '../../../../store/state';
import { passwordValidator } from '../../validators/password.validator';
import { AuthDto } from '../../models/user.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';

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
    MessagesModule,
  ],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = this.state.user.isLoading;
  loginErrorMessages: WritableSignal<string[]> = signal([]);

  constructor(
    private formBuilder: FormBuilder,
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

    this.state.user.login(authDto);
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  private setLoginErrors(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.loginErrorMessages.set(['Login or password incorrect']);
    }
  }
}
