import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.userService.isUserLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
