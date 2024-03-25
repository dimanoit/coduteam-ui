import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '../../store/store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = inject(Store).isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
