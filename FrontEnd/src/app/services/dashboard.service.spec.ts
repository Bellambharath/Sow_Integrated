import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetSODashboardData',()=>{
    const data=[
      {
        category: "Status",
        name: "Cancelled",
        count: 0
      },
      {
        category: "Status",
        name: "Closed",
        count: 0
      }]
      service.GetSODashboardData("weekly").subscribe((r)=>{
        expect(r).toBe(data)
      })
      const period="weekly";
      const request=httpMock.expectOne(service.baseUrl+"?period="+period)
      expect(request.request.method).toBe('GET')
      request.flush(data)

  })
  it('GetCandidateDashboardData',()=>{
    const data=[
      {
        category: "Status",
        name: "Cancelled",
        count: 0
      },
      {
        category: "Status",
        name: "Closed",
        count: 0
      }]
      service.GetCandidateDashboardData("weekly").subscribe((r)=>{
        expect(r).toBe(data)
      })
      const period="weekly";
      const request=httpMock.expectOne(service.baseUrl+"/GetCandidatesStats?period="+period)
      expect(request.request.method).toBe('GET')
      request.flush(data)
  })
  
});
