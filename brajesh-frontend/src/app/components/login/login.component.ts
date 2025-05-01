import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  readonly STRAPI_BASE_URL = 'https://1337-idx-brajeshgautam-1746079867605.cluster-6dx7corvpngoivimwvvljgokdw.cloudworkstations.dev'; // Make sure this matches your Strapi URL

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('LoginComponent initialized in browser. Attempting redirect to Strapi Google OAuth...');
      // Redirect to the Strapi Google authentication endpoint
      window.location.href = `${this.STRAPI_BASE_URL}/connect/google`;
    } else {
      console.log('LoginComponent initialized on server. Skipping redirect.');
    }
  }
}
