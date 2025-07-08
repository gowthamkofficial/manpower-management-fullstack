import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material-module';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterModule, MaterialModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Employee',
      icon: 'group',
      route: '/employee/list',
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Department', route: '/settings/department' },
        { label: 'CTC Calculator', route: '/settings/calculator' },
      ],
    },
  ];
}
