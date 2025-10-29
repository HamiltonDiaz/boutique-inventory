import { Routes } from '@angular/router';
import { LayoutsComponent } from './core/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: { breadcrumb: 'Dashboard' },
        canActivate: [authGuard],
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
        data: { breadcrumb: 'Clientes' },
        canActivate: [authGuard],
      },
      {
        path: 'country',
        loadComponent: () =>
          import('./features/country/country.component').then(
            (m) => m.CountryComponent
          ),
        data: { breadcrumb: 'País' },
        canActivate: [authGuard],
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./features/category/category.component').then(
            (m) => m.CategoryComponent
          ),
        data: { breadcrumb: 'Categoría' },
        canActivate: [authGuard],
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./features/user/user.component').then(
            (m) => m.UserComponent
          ),
        data: { breadcrumb: 'Usuarios' },
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
