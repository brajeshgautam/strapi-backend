import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [CommonModule, TitleCasePipe] 
})
export class AboutComponent implements OnInit {
  about: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:1337/api/about?populate=*').subscribe(res => {
      // If Strapi returns an array, use res[0]; if it returns {data: ...}, use res.data
      this.about = Array.isArray(res) ? res[0] : (res.data ? res.data[0] || res.data : res);
    });
  }

  formatKeys(formats: any): string[] {
    return formats ? Object.keys(formats) : [];
  }
} 