import { TestBed } from '@angular/core/testing';

import { LocationserviceService } from './locationservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LocationserviceService', () => {
  let service: LocationserviceService;
  let httpMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationserviceService]
    });
    service = TestBed.inject(LocationserviceService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllLocationData', () => {
    const data =
      [
        {
          locationId: 5,
          location: "BNG",
          regionId: 1,
          type: ""
        },
        {
          locationId: 4,
          location: "MY",
          regionId: 2,
          type: ""
        }
      ]
    service.GetAllLocationData().subscribe((r) => {
      expect(r).toBe(data)
    })
    const req = httpMock.expectOne(`${service.baseUrl}`)
    expect(req.request.method).toBe('GET')
  })
  it('PostLocationData', () => {
    const data =
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
    service.PostLocationData(data).subscribe((r) => {
      expect(r).toBe(data)
    })
    const req = httpMock.expectOne(`${service.baseUrl}`)
    expect(req.request.method).toBe('POST')
    req.flush(data)
  })
  it('DeleteLocationData', () => {
    const data =
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
    service.DeleteLocationData(data.locationId).subscribe((r) => {
      expect(r).toBe(data)
    })
    const id = 5
    const req = httpMock.expectOne(`${service.baseUrl}/${id}`)
    expect(req.request.method).toBe('DELETE')
  })
  it('UpdateLocationData', () => {
    const data =
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
    service.UpdateLocationData(data.locationId, data).subscribe((r) => {
      expect(r).toBe(data)
    })
    const id = 5
    const req = httpMock.expectOne(`${service.baseUrl}/${id}`)
    expect(req.request.method).toBe('PUT')
    req.flush(data)
  })
  it('GetLocationById', () => {
    const data =
    {
      locationId: 5,
      location: "BNG",
      regionId: 1,
      type: ""
    }
    service.GetLocationById(data.locationId).subscribe((r) => {
      expect(r).toBe(data)
    })
    const id = 5
    const req = httpMock.expectOne(`${service.baseUrl}/${id}`)
    expect(req.request.method).toBe('GET')

  })

  it('GetLocationByRegionId', () => {

    const data =

    {

      locationId: 5,

      location: "BNG",

      regionId: 1,

      type: ""

    }

    service.GetLocationByRegionId(data.regionId).subscribe((r) => {

      expect(r).toBe(data)

    })



  })

});
