import { Component, OnInit } from '@angular/core';
import { StrapiApiService } from '../../services/strapi-api.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe, NgIf, DatePipe, TitleCasePipe, NgForOf } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  imports: [HttpClientModule, JsonPipe, NgIf, DatePipe, TitleCasePipe, NgForOf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  homepageData: any;
  safeVideoUrl: SafeResourceUrl | undefined;

  constructor(private strapiApi: StrapiApiService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.strapiApi.getHomepage().subscribe({
      next: (response) => {
        console.log('Raw API response:', response);
        // Handle both possible response structures
        if (response.data?.attributes) {
          this.homepageData = response.data.attributes;
        } else if (response.attributes) {
          this.homepageData = response.attributes;
        } else {
          this.homepageData = response;
        }
        if (this.homepageData?.hero?.videoUrl) {
          this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.homepageData.hero.videoUrl);
        }
        console.log('Processed homepage data:', this.homepageData);
      },
      error: (error) => {
        console.error('Error fetching homepage data:', error);
      }
    });
  }
}
