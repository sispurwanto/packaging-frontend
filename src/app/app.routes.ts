import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // LOGIN (tanpa layout)
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component')
        .then(m => m.LoginComponent)
  },

  // ADMIN LAYOUT
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [

      { path: '', redirectTo: 'projects', pathMatch: 'full' },

      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/list/project-list.component')
            .then(m => m.ProjectListComponent)
      },
      {
        path: 'projects/new',
        loadComponent: () =>
          import('./features/projects/project-request.component')
            .then(m => m.ProjectRequestComponent)
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/projects/detail/project-detail.component')
            .then(m => m.ProjectDetailComponent)
      },

      {
        path: 'steelcases',
        loadComponent: () =>
          import('./features/steelcases/steelcase-list.component')
            .then(m => m.SteelcaseListComponent)
      },
      {
        path: 'steelcases/new',
        loadComponent: () =>
          import('./features/steelcases/form/steelcase-form.component')
            .then(m => m.SteelcaseFormComponent)
      },
      {
        path: 'steelcases/:id',
        loadComponent: () =>
          import('./features/steelcases/form/steelcase-form.component')
            .then(m => m.SteelcaseFormComponent)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/user-list.component')
            .then(m => m.UserListComponent)
      },
      {
        path: 'users/new',
        loadComponent: () =>
          import('./features/users/form/user-form.component')
            .then(m => m.UserFormComponent)
      },
      {
        path: 'users/:id',
        loadComponent: () =>
          import('./features/users/form/user-form.component')
            .then(m => m.UserFormComponent)
      }
    ]
  },

  { path: '**', redirectTo: '' }
];

