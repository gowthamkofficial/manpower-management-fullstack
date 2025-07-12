import { Routes } from '@angular/router';

// Session (Auth)
import { Login } from './modules/login/login';

// Employee Components
import { List } from './modules/employee/list/list';
import { Create } from './modules/employee/create/create';
import { View } from './modules/employee/view/view';
import { Update } from './modules/employee/update/update';

// Settings Components
import { Department } from './modules/settings/department/department';
import { Calculator } from './modules/settings/calculator/calculator';
import { Dashboard } from './modules/dashboard/dashboard';
import { AuthLayout } from './shared/components/auth-layout/auth-layout';
import { MainLayout } from './shared/components/main-layout/main-layout';
import { authGuard } from './core/auth-guard';
import { authenticatedGuard } from './core/authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login layout (no sidenav)
  {
    path: '',
    component: AuthLayout,
    canActivate: [authGuard],
    children: [{ path: 'login', component: Login }],
  },

  // Main layout (with sidenav)
  {
    path: '',
    component: MainLayout,
    canActivate: [authenticatedGuard],
    children: [
      { path: 'dashboard', component: Dashboard },

      {
        path: 'employee',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: List },
          { path: 'create', component: Create },
          { path: 'view/:id', component: View },
          { path: 'update/:id', component: Update },
        ],
      },
      {
        path: 'settings',
        children: [
          { path: '', redirectTo: 'department', pathMatch: 'full' },
          { path: 'department', component: Department },
          { path: 'calculator', component: Calculator },
        ],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
