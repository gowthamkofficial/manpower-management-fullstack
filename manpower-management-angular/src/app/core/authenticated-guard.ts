import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authenticatedGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser) {
    const isLoggedIn = sessionStorage.getItem('verified') === 'true';
    return isLoggedIn ? true : router.parseUrl('/login');
  }

  return router.parseUrl('/login');
};
