import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared-module';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/dashboard']);
  }
}
