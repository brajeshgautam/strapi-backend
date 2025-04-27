import { Component, OnInit } from '@angular/core';
import { StrapiApiService } from '../../services/strapi-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf, NgForOf, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [HttpClientModule, NgIf, NgForOf, RouterLink, RouterLinkActive, UpperCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  navigationData: any;
  openDropdownIndex: number | null = null;

  constructor(private strapiApi: StrapiApiService) {}

  ngOnInit() {
    this.strapiApi.getNavigation().subscribe(data => {
      this.navigationData = data;
    });
  }

  toggleDropdown(idx: number) {
    this.openDropdownIndex = this.openDropdownIndex === idx ? null : idx;
  }

  closeDropdown() {
    this.openDropdownIndex = null;
  }
}
