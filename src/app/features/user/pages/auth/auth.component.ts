import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthDto } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthType } from '../../models/auth-type.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [ButtonModule, ReactiveFormsModule, InputTextModule],
  standalone: true,
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  authType: AuthType = AuthType.SignIn;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (type && Object.values(AuthType).includes(type as AuthType)) {
        this.authType = type as AuthType;
      }
    });
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const authDto: AuthDto = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    let user$ =
      this.authType === AuthType.SignIn
        ? this.userService.login(authDto)
        : this.userService.register(authDto);

    user$.subscribe((user) => {
      this.router.navigate(['/projects']);
    });
  }
}
