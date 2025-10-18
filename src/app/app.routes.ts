import { Routes } from '@angular/router';
import { LayoutsComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
        data: { breadcrumb: 'Clientes' },
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  { path: '**', redirectTo: '' },
];
