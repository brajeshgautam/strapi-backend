import { Component, OnInit } from '@angular/core';
import { StrapiApiService } from '../../services/strapi-api.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe, NgIf, DatePipe, TitleCasePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [HttpClientModule, JsonPipe, NgIf, DatePipe, TitleCasePipe, NgForOf],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  homepageData: any;

  constructor(private strapiApi: StrapiApiService) {}

  ngOnInit() {
    this.strapiApi.getHomepage().subscribe(data => {
      this.homepageData = data;
    });
  }
}
