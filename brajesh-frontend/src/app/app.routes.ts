import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: HomepageComponent }, // homepage
  { path: 'login', component: LoginComponent }, // Add login route
  { path: '**', redirectTo: '' } // wildcard
];