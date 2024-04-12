import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Signal,
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
import { Router } from '@angular/router';
import { passwordValidator } from '../../validators/password.validator';
import { AuthDto } from '../../models/user.interface';
import { MessagesModule } from 'primeng/messages';
import { Store } from '../../../../store/store';

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
  private store = inject(Store);

  loginForm: FormGroup;
  isLoading: Signal<boolean> = this.store.isLoading;
  loginErrorMessages = this.store.authFailedErrors;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), passwordValidator],
      ],
    });

    effect(() => {
      if (this.store.currentUser() !== null)
        this.router.navigateByUrl('/projects');
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

    this.store.login(authDto);
  }

  navigateToRegistration() {
    this.router.navigate(['/register']);
  }
}
