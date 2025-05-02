import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN_KEY = 'jwt_token';
  private readonly STRAPI_API_URL = 'http://localhost:1337/api';

  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  loggedInStatus$ = this.loggedInStatus.asObservable();

  private userProfile = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userProfile.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {
    if (this.hasToken() && isPlatformBrowser(this.platformId)) {
      this.fetchUserProfile().subscribe();
    }
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.JWT_TOKEN_KEY);
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.JWT_TOKEN_KEY);
    }
    return null;
  }

  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.JWT_TOKEN_KEY, token);
      this.loggedInStatus.next(true);
      this.fetchUserProfile().subscribe();
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.JWT_TOKEN_KEY);
      this.userProfile.next(null);
      this.loggedInStatus.next(false);
    }
  }

  fetchUserProfile(): Observable<UserProfile | null> {
    const token = this.getToken();
    if (!token || !isPlatformBrowser(this.platformId)) {
      this.userProfile.next(null);
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UserProfile>(`${this.STRAPI_API_URL}/users/me?populate=picture`, { headers }).pipe(
      tap(user => {
        this.userProfile.next(user);
        this.loggedInStatus.next(true);
        console.log('User profile fetched:', user);
      }),
      catchError(error => {
        console.error('Error fetching user profile:', error);
        this.logout();
        this.loggedInStatus.next(false);
        return of(null);
      })
    );
  }
}
