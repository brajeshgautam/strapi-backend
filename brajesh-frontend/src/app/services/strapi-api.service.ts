import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrapiApiService {
  private apiUrl = 'http://localhost:1337/api'; // Update this if your Strapi runs elsewhere

  constructor(private http: HttpClient) { }

  getHomepage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/homepage?populate=deep`);
  }

  getFooter(): Observable<any> {
    return this.http.get(`${this.apiUrl}/footer?populate=deep`);
  }

  getNavigation(): Observable<any> {
    return this.http.get(`${this.apiUrl}/navigation?populate=deep`);
  }
}
