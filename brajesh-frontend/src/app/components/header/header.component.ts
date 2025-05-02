import { Component, OnInit, OnDestroy } from '@angular/core';
import { StrapiApiService } from '../../services/strapi-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgForOf, UpperCasePipe, NgClass, JsonPipe, AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

import { AuthService, UserProfile } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HttpClientModule,
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    AsyncPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  navigationData: any;
  openDropdownIndex: number | null = null;
  showLogo = true;
  logoUrl = '';
  readonly STRAPI_BASE_URL = 'http://localhost:1337';
  isLoggedIn$: Observable<boolean>;
  userProfile$: Observable<UserProfile | null>;

  constructor(private strapiApi: StrapiApiService, private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.loggedInStatus$;
    this.userProfile$ = this.authService.userProfile$;
  }

  ngOnInit() {
    this.strapiApi.getNavigation().subscribe(data => {
      this.navigationData = data;
      this.logoUrl = data.logo?.url ? this.STRAPI_BASE_URL + data.logo.url : '';
      this.showLogo = !!this.logoUrl;
    });
  }

  onLogoError(event: Event) {
    console.log('Logo error', event);
    this.showLogo = false;
  }

  toggleDropdown(idx: number) {
    this.openDropdownIndex = this.openDropdownIndex === idx ? null : idx;
  }

  closeDropdown() {
    this.openDropdownIndex = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  ngOnDestroy(): void {
  }
}
