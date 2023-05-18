import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountserviceService } from './accountservice.service';

describe('AccountserviceService', () => {
  let service: AccountserviceService;
  let httpMock;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountserviceService]
    });
    service = TestBed.inject(AccountserviceService);
    httpMock = TestBed.inject(HttpTestingController);
   
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('GetAllAccountData', () => {
    const obj = [{  accountId: 1,
    accountName: "DL-IN",
    type: ""}, { 
      accountId: 2,
      accountName: "DL-US",
      type: ""
     }];

    service.GetAllAccountData().subscribe((data) => {
      expect(data).toEqual(obj);
    });
    const request=httpMock.expectOne(`${service.baseUrl}`)
    expect(request.request.method).toBe('GET')
    request.flush(obj)
    
  });

  it('PostAccountData', () => {
    const obj = {  accountId: 1,
      accountName: "DL-IN",
      type: ""};

    service.PostAccountData(obj).subscribe((response) => {
      expect(response).toEqual(obj);
    });
    const request=httpMock.expectOne(`${service.baseUrl}`)
    expect(request.request.method).toBe('POST')
    request.flush(obj)

  });
  it('DeleteAccountData',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.DeleteAccountData(obj.accountId).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
      const id=1
      const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('DELETE')
    
  })
  it('UpdateAccountData',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.UpdateAccountData(obj.accountId,obj).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
      const id =1 
      const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('PUT')
      
  })
  it('GetAccountById',()=>{
    const obj={accountId: 1,
      accountName: "DL-IN",
      type: ""}
      service.GetAccountById(obj.accountId).subscribe((x)=>[
        expect(x).toEqual(obj)
      ])
      const id =1 
      const request=httpMock.expectOne(`${service.baseUrl}/${id}`)
      expect(request.request.method).toBe('GET')
      
  })


});
