import { Routes } from '@angular/router';
import { LoginComponent } from '../Shared-Component/login/login.component';
import { DashboardComponent } from '../Main-component/dashboard/dashboard.component';
import { AddressBookComponent } from '../Main-component/address-book/address-book.component';
import { PlayersComponent } from '../Main-component/dashboard/players/players.component';
import { AddPlayerComponent } from '../Main-component/dashboard/add-player/add-player.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'teams', component: DashboardComponent },
  { path: 'addPlayer', component: AddPlayerComponent },
  { path: 'teams/players', component: PlayersComponent },
  { path: 'addressBook', component: AddressBookComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for undefined paths
];
