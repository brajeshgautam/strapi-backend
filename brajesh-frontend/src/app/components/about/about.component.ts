import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule, TitleCasePipe]
})
export class AboutComponent implements OnInit {
  about: any;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Check for access_token in the query parameters
    this.route.queryParams.subscribe(params => {
      const token = params['access_token']; // Get token from query params

      if (token) {
        console.log('Received JWT token via query params:', token);
        // Only store and navigate if we found a token in query params
        if (isPlatformBrowser(this.platformId)) { // Add platform check for localStorage
          localStorage.setItem('jwt_token', token); // Store the token
        }
        // Remove the query params from URL to keep it clean
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { }, // Clear query params
          replaceUrl: true
        });
      } else {
        // If no token in query params, proceed with existing logic
        // Ensure this only runs if we *didn't* just process a token
        this.fetchAboutData();
      }
    });
  }

  // Extracted data fetching logic into a separate method
  fetchAboutData() {
    this.http.get<any>('http://localhost:1337/api/about?populate=*').subscribe(res => {
      this.about = Array.isArray(res) ? res[0] : (res.data ? res.data[0] || res.data : res);
    });
  }

  formatKeys(formats: any): string[] {
    return formats ? Object.keys(formats) : [];
  }
}