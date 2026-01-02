import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // if (!auth.isAuthenticated()) {
  //   router.navigate(['/login']);
  //   return false;
  // }
  // return true;
    if (!isPlatformBrowser(platformId)) {
      return false;
    }

    if (!auth.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    return true;
};
