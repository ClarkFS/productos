import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./presentation/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./presentation/pages/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./presentation/pages/productos/productos.component').then(
            (m) => m.ProductosComponent
          ),
      },
      {
        path: 'admin',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./presentation/pages/admins/main/admin.component').then(
                (m) => m.AdminComponent
              ),
          },
          {
            path: 'agregar',
            loadComponent: () =>
              import('./presentation/pages/admins/agregar/agregar.component').then(
                (m) => m.AgregarComponent
              ),
          },
          {
            path: 'actualizar/:id',
            loadComponent: () =>
              import('./presentation/pages/admins/actualizar/actualizar.component').then(
                (m) => m.ActualizarComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./presentation/pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./presentation/pages/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
