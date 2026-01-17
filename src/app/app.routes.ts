import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [
  // Redirect root → users
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },

  // Users list page
  {
    path: 'users',
    component: UsersComponent,
  },

  // User details page
  {
    path: 'users/:id',
    component: UserDetailsComponent,
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'users',
  },
];
