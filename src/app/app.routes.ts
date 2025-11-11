import { Routes } from '@angular/router';
import { LayoutsComponent } from './core/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { RoutesEnum } from './shared/routes.enum';

export const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: RoutesEnum.DASHBOARD,
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: { breadcrumb: 'Dashboard' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.CUSTOMERS,
        loadComponent: () =>
          import('./features/customers/customers.component').then(
            (m) => m.CustomersComponent
          ),
        data: { breadcrumb: 'Clientes' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.COUNTRY,
        loadComponent: () =>
          import('./features/country/country.component').then(
            (m) => m.CountryComponent
          ),
        data: { breadcrumb: 'País' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.CATEGORY,
        loadComponent: () =>
          import('./features/category/category.component').then(
            (m) => m.CategoryComponent
          ),
        data: { breadcrumb: 'Categoría' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.USER,
        loadComponent: () =>
          import('./features/user/user.component').then((m) => m.UserComponent),
        data: { breadcrumb: 'Usuarios' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.COLOR,
        loadComponent: () =>
          import('./features/color/color.component').then(
            (m) => m.ColorComponent
          ),
        data: { breadcrumb: 'Colores' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.PURCHASE,
        loadComponent: () =>
          import('./features/purchase/purchase.component').then(
            (m) => m.PurchaseComponent
          ),
        data: { breadcrumb: 'Compras' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.SALES,
        loadComponent: () =>
          import('./features/sales/sales.component').then(
            (m) => m.SalesComponent
          ),
        data: { breadcrumb: 'Ventas' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.SUPPLIER,
        loadComponent: () =>
          import('./features/supplier/supplier.component').then(
            (m) => m.SupplierComponent
          ),
        data: { breadcrumb: 'Proveedores' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.PRODUCTS,
        loadComponent: () =>
          import('./features/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        data: { breadcrumb: 'Productos' },
        canActivate: [authGuard],
      },
      {
        path: RoutesEnum.SIZE,
        loadComponent: () =>
          import('./features/size/size.component').then((m) => m.SizeComponent),
        data: { breadcrumb: 'Tallas' },
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: RoutesEnum.AUTH,
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
