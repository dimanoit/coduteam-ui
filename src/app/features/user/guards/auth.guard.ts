import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isUserLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
