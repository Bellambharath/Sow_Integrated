import { TestBed } from '@angular/core/testing';

import { StatusserviceService } from './statusservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StatusserviceService', () => {
  let service: StatusserviceService;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[StatusserviceService]
    });
    service = TestBed.inject(StatusserviceService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllStatusData',()=>{
    const data=
    [
      {
        statusId: 6,
      statusName: "Rejected",
        type: "",
        statusType: "Candidate"
      },
      {
        statusId: 5,
        statusName: "Cancelled",
        type: "",
        statusType: "Candidate"
      }]
      service.GetAllStatusData().subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('GET')
  })
  it('PostStatusData',()=>{
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
      service.PostStatusData(data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const req=httpMock.expectOne(`${service.baseUrl}`)
      expect(req.request.method).toBe('POST')
      req.flush(data)

  })
  it('DeleteStatusData',()=>{
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
      service.DeleteStatusData(data.statusId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=6
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('DELETE')
  })
  it('UpdateStatusData',()=>{
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
      service.UpdateStatusData(data.statusId,data).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=6
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('PUT')
      req.flush(data)
  })
  it('GetStatusById',()=>{
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
      service.GetStatusById(data.statusId).subscribe((r)=>{
        expect(r).toBe(data)
      })
      const id=6
      const req=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(req.request.method).toBe('GET')
      req.flush(data)
  })
  it('GetStatusByType',()=>{
    const data=
    {
      statusId: 6,
    statusName: "Rejected",
      type: "",
      statusType: "Candidate"
    }
      service.GetStatusByType(data.statusId).subscribe((r)=>{
        expect(r).toBe(data)
      })
  })
});
