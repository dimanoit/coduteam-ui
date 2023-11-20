import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.userService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/auth']); // Redirect to login if not logged in
      return false;
    }

    return true;
  }
}