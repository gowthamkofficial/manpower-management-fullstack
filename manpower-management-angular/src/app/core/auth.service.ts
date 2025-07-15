// src/app/core/auth.service.ts
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('verified') === 'true';
    }
    return false;
  }
}
