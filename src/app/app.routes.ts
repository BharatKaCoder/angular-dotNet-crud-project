import { Routes } from '@angular/router';
import { LoginComponent } from '../Shared-Component/login/login.component';
import { DashboardComponent } from '../Main-component/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
//   { path: '**', redirectTo: '' }, // Wildcard route for undefined paths
];
