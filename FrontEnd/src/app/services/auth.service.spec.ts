import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('loggedIn is true', () => {
    const userData = { username: 'Admin', Password: 'Sow@123' };
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(userData));
    expect(service.loggedIn()).toBeTrue();
  });

  it('loggedIn is false', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    expect(service.loggedIn()).toBeFalse();
  });
});
