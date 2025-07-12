import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const isBrowser = isPlatformBrowser(platformId);

  if (isBrowser) {
    const isLoggedIn = sessionStorage.getItem('verified') === 'true';
    // If already logged in, redirect to /dashboard
    return !isLoggedIn ? true : router.parseUrl('/dashboard');
  }

  // Prevent route access in non-browser environments (SSR)
  return true;
};
