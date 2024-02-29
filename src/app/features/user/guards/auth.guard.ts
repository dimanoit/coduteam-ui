import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isUserLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
