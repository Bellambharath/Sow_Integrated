import { TestBed } from '@angular/core/testing';

import { SecurityserviceService } from './securityservice.service';

describe('SecurityserviceService', () => {
  let service: SecurityserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
