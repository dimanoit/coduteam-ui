import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
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
import { State } from '../../../../store/state';
import { AccountRegistrationDto, AuthDto } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../../validators/password.validator';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

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
    MessagesModule,
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  authForm!: FormGroup;
  registerErrorMessages: WritableSignal<Message[]> = signal([]);

  protected state = inject(State);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  isActivation = this.state.user.isActivation;

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator],
      ],
    });

    const credentials = this.state.user.credentials;
    this.state.user.login(credentials);
  }

  activateUser(data: AccountRegistrationDto) {
    this.state.user.finishRegistration(data);
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

    this.state.user.register(authDto);
  }

  private setRegisterErrors(error: HttpErrorResponse) {
    if (error.status === 400) {
      const messages: Message[] = Object.entries(error?.error.errors || {})
        .map(([key, value]) => ({
          severity: 'error',
          detail: (value as string[]).join(' '),
        }))
        .flat();

      this.registerErrorMessages.set(messages);
    }
  }
}
