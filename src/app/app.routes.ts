import { Routes } from '@angular/router';
import { LoginComponent } from '../Shared-Component/login/login.component';
import { DashboardComponent } from '../Main-component/dashboard/dashboard.component';
import { AddressBookComponent } from '../Main-component/address-book/address-book.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'teams', component: DashboardComponent },
  { path: 'addressBook', component: AddressBookComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for undefined paths
];
