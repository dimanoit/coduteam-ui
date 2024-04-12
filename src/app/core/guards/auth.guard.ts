import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '../../store/store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);

  const isLoggedIn: boolean = store.isLoggedIn() || store.token() !== null;

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
