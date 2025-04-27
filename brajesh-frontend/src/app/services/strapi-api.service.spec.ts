import { TestBed } from '@angular/core/testing';

import { StrapiApiService } from './strapi-api.service';

describe('StrapiApiService', () => {
  let service: StrapiApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrapiApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
