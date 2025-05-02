import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap, first } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule, TitleCasePipe]
})
export class AboutComponent implements OnInit {
  about: any;
  isLoading: boolean = false;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) { 
      this.isLoading = true; 
      this.route.queryParams.pipe(first()).subscribe(params => { 
        const token = params['jwt'];
        const error = params['error'];
        const message = params['message'];

        if (token) {
          console.log('Received JWT token via query params:', token);
          this.authService.login(token); 

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {}, 
            replaceUrl: true 
          }).then(() => {
            console.log('Navigating to home after successful login.');
            this.router.navigate(['/']); 
          }).catch(err => {
             console.error('Error navigating after login:', err);
             this.isLoading = false; 
          });

        } else if (error) {
          console.error('OAuth Error received:', decodeURIComponent(message || 'Unknown error'));
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {}, 
            replaceUrl: true
          }).then(() => {
             console.log('Navigating to home after login error.');
             this.router.navigate(['/']); 
          }).catch(err => {
            console.error('Error navigating after login error:', err);
            this.isLoading = false;
          });
        } else {
          console.log('About page loaded without JWT or error params.');
          this.isLoading = false; 
          this.fetchAboutData(); 
        }
      });
    } else {
       this.fetchAboutData(); 
    }
  }

  fetchAboutData() {
     console.log('Fetching about page data...');
     this.http.get<any>('http://localhost:1337/api/about?populate=*').subscribe(res => {
      this.about = Array.isArray(res) ? res[0] : (res.data ? res.data[0] || res.data : res);
      this.isLoading = false;
    });
  }

  formatKeys(formats: any): string[] {
    return formats ? Object.keys(formats) : [];
  }
}