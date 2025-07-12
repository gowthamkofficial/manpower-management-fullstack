import { Component, OnInit, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { SharedModule } from '../../shared/shared-module';
import { LoaderService } from '../../core/loader';
import { ApiService } from '../../core/api.service';
import { ToasterService } from '../../core/toaster.service';
import { getErrorType } from '../../core/form-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {
  signInform: FormGroup;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private loader: LoaderService,
    private service: ApiService,
    private toaster: ToasterService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.initializeSignInForm();

    if (this.isBrowser && sessionStorage.getItem('verified') === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  initializeSignInForm() {
    this.signInform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  getErrorType(
    control: FormControl,
    label: string,
    type?: 'select' | 'provide',
    number?: any
  ) {
    return getErrorType(control, label, type, number);
  }

  login() {
    this.signInform.markAllAsTouched();

    if (this.signInform.valid) {
      this.loader.open();

      this.service.post('session/signin', this.signInform.value)
        .pipe(delay(1000))
        .subscribe({
          next: (res: any) => {
            this.loader.close();
            this.toaster.success(res?.message ?? 'Logged in successfully');

            if (this.isBrowser) {
              sessionStorage.setItem('verified', 'true');
            }

            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Login error:', err);
            this.toaster.error(err?.error?.message ?? 'Something went wrong!');
            this.loader.close();
          }
        });
    }
  }

  get form() {
    return this.signInform.controls;
  }
}
