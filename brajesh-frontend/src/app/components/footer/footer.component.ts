import { Component, OnInit } from '@angular/core';
import { StrapiApiService } from '../../services/strapi-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [HttpClientModule, NgIf, NgForOf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  footerData: any;

  constructor(private strapiApi: StrapiApiService) {}

  ngOnInit() {
    this.strapiApi.getFooter().subscribe(data => {
      this.footerData = data;
    });
  }
}
