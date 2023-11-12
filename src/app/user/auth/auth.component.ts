import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginDto, User } from '../user.interface';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginDto: LoginDto = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.userService.login(loginDto).subscribe({
        next: (user) => {
          if (user) {
            console.log('Login successful', user);
            this.router.navigate(['/projects']);
          } else {
            alert('Login failed');
          }
        },
        error: (error) => {
          alert('Error during login:' + error);
        },
        complete: () => {
          console.log('Login request completed');
        },
      });
    }
  }
}
