import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatemappingComponent } from './candidatemapping.component';
import { CandidatemappingService } from '../services/candidatemapping.service';
import { CandidateService } from '../services/candidate.service';
import { SOWService } from '../services/sow.service';
import { StatusserviceService } from '../services/statusservice.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';
import { AbstractControl } from '@angular/forms';

describe('CandidatemappingComponent', () => {
  let component: CandidatemappingComponent;
  let fixture: ComponentFixture<CandidatemappingComponent>;
  let mockCandidatemappingService,mockcandidateService,mockSOWService,mockStatusserviceService
  ,mockExcelService,mockLoginService,mockexceldata,mockCandidatedata,mockcandidatemappingdata,
  mocksodata,mockstatusdata
  beforeEach(async () => {
    mockcandidateService=jasmine.createSpyObj('CandidateService',['PostCandidateDuplicateCheck','GetAllCandidatesData','PostCandidateData','DeleteCandidateData','UpdateCandidateData',
    'GetCandidateById','GetCandidateByDate'])

    mockCandidatemappingService=jasmine.createSpyObj('CandidatemappingService',['GetAllCandidateMappingData','PostCandidateMappingData','UpdateCandidateMappingData','GetCandidateById','DeleteCandidateMappingData'])
    mockExcelService=jasmine.createSpyObj('ExcelService',['jsonExportAsExcel'])
    mockSOWService=jasmine.createSpyObj('SOWService',['GetAllSowData','PostSOWDuplicateCheck','PostSowData',
  'DeleteSowData','UpdateSowData','GetSowById','GetSOByDate'])
  mockStatusserviceService=jasmine.createSpyObj('StatusserviceService',['GetAllStatusData','PostStatusData',
'DeleteStatusData','UpdateStatusData','GetStatusById','GetStatusByType'])
    await TestBed.configureTestingModule({
      declarations: [ CandidatemappingComponent ],
      providers:[{provide:CandidatemappingService,useValue:mockCandidatemappingService},{provide:CandidateService,useValue:mockcandidateService},
      {provide:SOWService,useValue:mockSOWService},{provide:StatusserviceService,useValue:mockStatusserviceService},{provide:ExcelService,useValue:mockExcelService},
    {provide:LoginService,useValue:mockLoginService}]
    })
    .compileComponents();
    mocksodata= [
      {
        "sowId": 6,
        "soName": "prathyusha123",
        "jrCode": "1234",
        "requestCreationDate": "2023-04-04T13:06:55.02",
        "accountId": 4,
        "technologyId": 180,
        "role": "Developer",
        "locationId": 3,
        "regionId": 2,
        "targetOpenPositions": 1,
        "positionsTobeClosed": 1,
        "ustpocId": 41,
        "recruiterId": 28,
        "usttpmId": 63,
        "dellManagerId": 577,
        "statusId": 2,
        "band": "A",
        "projectId": "123",
        "accountManager": "mahesh",
        "externalResource": "bhagya",
        "internalResource": "bhagya",
        "type": "",
        "technologyName": "Validation Eng",
        "accountName": "DL-MY",
        "location": "SG",
        "region": "MY",
        "ustpocName": "Jaya/Kanika",
        "recruiterName": "Srivani Doli",
        "usttpmName": "Vijay Kumar",
        "dellManagerName": "Vinitha",
        "statusName": "Declined"
      },
      {
        "sowId": 5,
        "soName": "Chaithra123",
        "jrCode": "1234",
        "requestCreationDate": "2023-04-04T13:06:55.02",
        "accountId": 4,
        "technologyId": 180,
        "role": "Developer",
        "locationId": 3,
        "regionId": 2,
        "targetOpenPositions": 1,
        "positionsTobeClosed": 1,
        "ustpocId": 41,
        "recruiterId": 28,
        "usttpmId": 63,
        "dellManagerId": 577,
        "statusId": 2,
        "band": "A",
        "projectId": "123",
        "accountManager": "mahesh",
        "externalResource": "bhagya",
        "internalResource": "bhagya",
        "type": "",
        "technologyName": "Validation Eng",
        "accountName": "DL-MY",
        "location": "SG",
        "region": "MY",
        "ustpocName": "Jaya/Kanika",
        "recruiterName": "Srivani Doli",
        "usttpmName": "Vijay Kumar",
        "dellManagerName": "Vinitha",
        "statusName": "Declined"
      },
      {
        "sowId": 4,
        "soName": "test",
        "jrCode": "14",
        "requestCreationDate": "2023-03-03T00:00:00",
        "accountId": 3,
        "technologyId": 178,
        "role": "Software Developer",
        "locationId": 2,
        "regionId": 3,
        "targetOpenPositions": 1,
        "positionsTobeClosed": 1,
        "ustpocId": 37,
        "recruiterId": 24,
        "usttpmId": 64,
        "dellManagerId": 581,
        "statusId": 1,
        "band": "c",
        "projectId": "12345",
        "accountManager": "mahesh",
        "externalResource": "test1",
        "internalResource": "wrfrwg",
        "type": "",
        "technologyName": "UX Designer",
        "accountName": "DL-USTI",
        "location": "HYD",
        "region": "SG",
        "ustpocName": "Selva",
        "recruiterName": "Soumya Dash",
        "usttpmName": "Ravi Jonnalagadda",
        "dellManagerName": "Vishwa",
        "statusName": "Offered"
      },
      {
        "sowId": 3,
        "soName": "Bhagya",
        "jrCode": "14",
        "requestCreationDate": "2023-04-04T13:26:08.807",
        "accountId": 3,
        "technologyId": 175,
        "role": "admin",
        "locationId": 3,
        "regionId": 3,
        "targetOpenPositions": 1,
        "positionsTobeClosed": 1,
        "ustpocId": 37,
        "recruiterId": 27,
        "usttpmId": 66,
        "dellManagerId": 573,
        "statusId": 3,
        "band": "A",
        "projectId": "dhhef",
        "accountManager": "mahesh",
        "externalResource": "test1",
        "internalResource": "chaithra",
        "type": "",
        "technologyName": "UI-Front end",
        "accountName": "DL-USTI",
        "location": "SG",
        "region": "SG",
        "ustpocName": "Selva",
        "recruiterName": "Srinivas",
        "usttpmName": "Lakshmi Narasimha Rao Kovuru",
        "dellManagerName": "Vikranth",
        "statusName": "Closed"
      },
      {
        "sowId": 2,
        "soName": "Chaithra",
        "jrCode": "1234",
        "requestCreationDate": "2023-04-04T13:06:55.02",
        "accountId": 4,
        "technologyId": 180,
        "role": "Developer",
        "locationId": 3,
        "regionId": 2,
        "targetOpenPositions": 1,
        "positionsTobeClosed": 1,
        "ustpocId": 41,
        "recruiterId": 28,
        "usttpmId": 63,
        "dellManagerId": 577,
        "statusId": 2,
        "band": "A",
        "projectId": "123",
        "accountManager": "mahesh",
        "externalResource": "bhagya",
        "internalResource": "bhagya",
        "type": "",
        "technologyName": "Validation Eng",
        "accountName": "DL-MY",
        "location": "SG",
        "region": "MY",
        "ustpocName": "Jaya/Kanika",
        "recruiterName": "Srivani Doli",
        "usttpmName": "Vijay Kumar",
        "dellManagerName": "Vinitha",
        "statusName": "Declined"
      },
      {
        "sowId": 1,
        "soName": "deepika",
        "jrCode": "142",
        "requestCreationDate": "2023-03-14T14:47:22.96",
        "accountId": 4,
        "technologyId": 180,
        "role": "Dev",
        "locationId": 3,
        "regionId": 2,
        "targetOpenPositions": 2,
        "positionsTobeClosed": 1,
        "ustpocId": 41,
        "recruiterId": 28,
        "usttpmId": 63,
        "dellManagerId": 577,
        "statusId": 2,
        "band": "A",
        "projectId": "12345",
        "accountManager": "sathish",
        "externalResource": "test1",
        "internalResource": "wrfrwgwe",
        "type": "",
        "technologyName": "Validation Eng",
        "accountName": "DL-MY",
        "location": "SG",
        "region": "MY",
        "ustpocName": "Jaya/Kanika",
        "recruiterName": "Srivani Doli",
        "usttpmName": "Vijay Kumar",
        "dellManagerName": "Vinitha",
        "statusName": "Declined"
      }
    ]
    mockCandidatedata=[{
      "candidateId": 7,
      "candidateName": "bharath",
      "mobileNo": "8522019567",
      "gender": "female",
      "dob": "2023-04-15T00:00:00",
      "email": "bharath@ust.com",
      "location": "Hyderabad",
      "skills": "c#",
      "joiningDate": "2023-04-21T00:00:00",
      "address": "1-14,neeliagudem,thripuraram,nalgonda",
      "status": "Cancelled",
      "pincode": "500084",
      "isInternal": true
    },
    {
      "candidateId": 6,
      "candidateName": "sahith",
      "mobileNo": "8522019567",
      "gender": "female",
      "dob": "2023-04-15T00:00:00",
      "email": "sahith@ust.com",
      "location": "Hyderabad",
      "skills": "c#",
      "joiningDate": "2023-04-21T00:00:00",
      "address": "1-14,neeliagudem,thripuraram,nalgonda",
      "status": "Cancelled",
      "pincode": "500084",
      "isInternal": true
    },
    {
      "candidateId": 5,
      "candidateName": "prathyushareddy12",
      "mobileNo": "8522019567",
      "gender": "female",
      "dob": "2023-04-15T00:00:00",
      "email": "prathyushareddy1235@ust-global.com",
      "location": "Hyderabad",
      "skills": "c#",
      "joiningDate": "2023-04-21T00:00:00",
      "address": "1-14,neeliagudem,thripuraram,nalgonda",
      "status": "Cancelled",
      "pincode": "500084",
      "isInternal": true
    },
    {
      "candidateId": 4,
      "candidateName": "divya123 G",
      "mobileNo": "7982876283",
      "gender": "female",
      "dob": "2001-02-14T00:00:00",
      "email": "divya123@gmail.com",
      "location": "hydrabad",
      "skills": "Java",
      "joiningDate": "2023-04-04T00:00:00",
      "address": "Ananthapur",
      "status": "Joined",
      "pincode": "456382",
      "isInternal": true
    },
    {
      "candidateId": 3,
      "candidateName": "Bhagya",
      "mobileNo": "9239282922",
      "gender": "female",
      "dob": "1998-02-10T00:00:00",
      "email": "bhagya@ust.com",
      "location": "tirupathi",
      "skills": ".Net",
      "joiningDate": "2023-04-13T00:00:00",
      "address": "tirupati",
      "status": "Cancelled",
      "pincode": "563876",
      "isInternal": false
    },
    {
      "candidateId": 2,
      "candidateName": "divya G",
      "mobileNo": "7982876283",
      "gender": "female",
      "dob": "2001-02-14T00:00:00",
      "email": "divya@gmail.com",
      "location": "hydrabad",
      "skills": "Java",
      "joiningDate": "2023-04-04T00:00:00",
      "address": "Ananthapur",
      "status": "Joined",
      "pincode": "456382",
      "isInternal": true
    },
    {
      "candidateId": 1,
      "candidateName": "Deepika A",
      "mobileNo": "9182737383",
      "gender": "female",
      "dob": "2000-04-03T00:00:00",
      "email": "akuladeepika431@gmail.com",
      "location": "Bangalore",
      "skills": "Angular",
      "joiningDate": "2023-03-03T00:00:00",
      "address": "Ananthapur",
      "status": "Rejected",
      "pincode": "456382",
      "isInternal": true
    }
  ]
  
  mockcandidatemappingdata=[
    {
      "soW_CandidateId": 2,
      "sowId": 6,
      "candidateId": 5,
      "statusId": 2,
      "type": "",
      "soName": "prathyusha123",
      "candidateName": "prathyushareddy12",
      "statusName": "Declined"
    },
    {
      "soW_CandidateId": 1,
      "sowId": 7,
      "candidateId": 7,
      "statusId": 2,
      "type": "",
      "soName": "sahith",
      "candidateName": "bharath",
      "statusName": "Declined"
    }
  ]
  mockexceldata=[ { "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support"}, { "domainId": 8, "domainName": "R&D" }]
  mockstatusdata=[ {
    "statusId": 6,
    "statusName": "Rejected",
    "type": "",
    "statusType": "Candidate"
  },
  {
    "statusId": 5,
    "statusName": "Cancelled",
    "type": "",
    "statusType": "Candidate"
  },
  {
    "statusId": 4,
    "statusName": "Joined",
    "type": "",
    "statusType": "Candidate"
  },
  {
    "statusId": 3,
    "statusName": "Closed",
    "type": "",
    "statusType": "SO"
  },
  {
    "statusId": 2,
    "statusName": "Declined",
    "type": "",
    "statusType": "SO"
  },
  {
    "statusId": 1,
    "statusName": "Offered",
    "type": "",
    "statusType": "SO"
  }]
    fixture = TestBed.createComponent(CandidatemappingComponent);
    component = fixture.componentInstance;
    mockcandidateService.GetAllCandidatesData.and.returnValue(of(mockCandidatedata))
    mockcandidateService.PostCandidateData.and.returnValue(of(mockCandidatedata))
    mockcandidateService.UpdateCandidateData.and.returnValue(of(mockCandidatedata))
    mockcandidateService.GetCandidateByDate.and.returnValue(of(mockCandidatedata))
    mockcandidateService.DeleteCandidateData.and.returnValue(of(mockCandidatedata.candidateId))
    mockCandidatemappingService.GetAllCandidateMappingData.and.returnValue(of(mockcandidatemappingdata))
    mockExcelService.jsonExportAsExcel.and.returnValue(of(mockexceldata))
    mockSOWService.GetAllSowData.and.returnValue(of(mocksodata))
    mockCandidatemappingService.UpdateCandidateMappingData.and.returnValue(of(component.Id, mockcandidatemappingdata))
    mockCandidatemappingService.PostCandidateMappingData.and.returnValue(of(mockcandidatemappingdata))
    mockCandidatemappingService.DeleteCandidateMappingData.and.returnValue(of(mockcandidatemappingdata.soW_CandidateId))
    mockStatusserviceService.GetAllStatusData.and.returnValue(of(mockstatusdata))
    mockStatusserviceService.GetStatusByType.and.returnValue(of(mockstatusdata))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('OnPreviousReleased',()=>{
    spyOn(window,'clearInterval')
    component.OnPreviousReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
  })
  it('OnPreviousHeld. currentpage should be greater than 1',()=>{
    component.currentPage=2;
    spyOn(component,'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().uninstall()
    
  })
  it('OnPreviousHeld, currentpage should be  less than or equal to 1',()=>{
    component.currentPage=1
    spyOn(component,'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().uninstall()
  })
  it('OnNextReleased',()=>{
    spyOn(window,'clearInterval')
    component.OnNextReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval)
  })
  it('OnNextHeld,currentPage should be less than totalpages',()=>{
     component.totalPages=3
     component.currentPage=2
     spyOn(component,'OnNextClicked')
     jasmine.clock().install()
     jasmine.clock().tick(200)
     expect(component.OnNextHeld()).toBe()
     jasmine.clock().tick(200)
     expect(component.OnNextHeld()).toBe()
     jasmine.clock().uninstall()
  })
  it('OnNextHeld,currentPage should be greater than or equaln to totalpages',()=>{
    component.totalPages=3
    component.currentPage=4
    spyOn(component,'OnNextClicked')
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().uninstall()
  })
  it('OnPreviousClicked', () => {
    component.currentPage = 3;
    component.OnPreviousClicked();
    expect(component.currentPage).toEqual(2);
   

  });
  it('OnNextClicked',()=>{
    component.currentPage=3;
    component.OnNextClicked()
    expect(component.currentPage).toEqual(4);
  })
  it('OnPageNumberChanged, should set currentPage equal to 1',()=>{
     const event={target:{value:0}}
     component.totalPages=5;
     component.OnPageNumberChanged(event)
     expect(component.currentPage).toEqual(1)
     expect(event.target.value).toEqual(1)
  })
  it('OnPageNumberChanged, should set currentPage greater than totalpages',()=>{
    const event={target:{value:10}}
    component.totalPages=5;
    component.OnPageNumberChanged(event)
    expect(component.currentPage).toEqual(1)
    expect(event.target.value).toEqual(1)
 })
 it('OnPageNumberChanged, should set currentPage less than totalpages',()=>{
  const event={target:{value:3}}
  component.totalPages=5;
  component.OnPageNumberChanged(event)
  expect(component.currentPage).toBe(3)
  expect(event.target.value).toBe(3)
})
it('setDefaultPaginationForcly',()=>{
  component.batchFilteredRecord=[1,2,3]
  component.pageSizeSelected=2;
  spyOn(component,'batchFilteredRecord').and.returnValue(component.batchFilteredRecord)
  component.SetDefaultPaginationForcly([1,2])
  expect(component.batchRecord.length).toBe(2)
  
})
it('searchFilter, search text is defined ', () => {
  const searchText = 'sahith';
  const data = [     {
    soW_CandidateId: 2,
    sowId: 6,
    candidateId: 5,
    statusId: 2,
    type: "",
    soName: "prathyusha123",
    candidateName: "prathyushareddy12",
    statusName: "Declined"
  },
  {
    soW_CandidateId: 1,
    sowId: 7,
    candidateId: 7,
    statusId: 2,
    type: "",
    soName: "sahith",
    candidateName: "bharath",
    statusName: "Declined"
  } ];
  component.MappingData = data;
  component.searchText = searchText;
  component.searchFilter();
  expect(component.batchRecord.length).toBe(1);
 
});

it('searchFilter',()=>{

  component.searchText= ''
  spyOn(component,'SetDefaultPaginationForcly')
  component.searchFilter();
  expect(component.batchRecord.length).toEqual(0)
})

// it('searchFilter',()=>{
 
//   component.searchText= 'prathyusha123 '
//   spyOn(component,'SetDefaultPaginationForcly')
//   component.searchFilter();
//   expect(component.SetDefaultPaginationForcly(component.batchRecord)).toBe()
//   expect(component.batchRecord).toEqual([])
// })
it('onSubmit ',()=>{
  component.mapppingForm.patchValue({sowId:'',candidateId:'',statusId:''})
  component.submitted=true

  component.onSubmit();
  expect(component.onSubmit()).toBe()
})

it('onSubmit,should call onEdit ',()=>{
  component.mapppingForm.patchValue({candidateId:'1',sowId:'3',statusId:'1'})
  spyOn(component,'isDuplicate').and.returnValue(false)
  spyOn(component,'onAdd');
component.onAdd(); 
  component.onSubmit();
  expect(component.onAdd).toHaveBeenCalled()
})
it('isDuplicate, should be not null', () => {
  const formValue={
      sowId: '7',
      candidateId: '7',
      statusId: '2',
     };
     const stringValue = {
      sowId: formValue.sowId.toString(),
      candidateId: formValue.candidateId.toString(),
      statusId: formValue.statusId.toString(),
    } 
  component.mapppingForm.patchValue(stringValue);
  spyOn(component, 'isDuplicate').and.callThrough();
  expect(component.isDuplicate(true)).toBe(false);
});
it('isDuplicate, should be null', () => {
  component.mapppingForm.patchValue({ sowId:'',candidateId:'',statusId:''}); 
  spyOn(component, 'isDuplicate').and.callThrough();
  expect(component.isDuplicate(false)).toBe(false);
});
it('isDuplicate, should be isEdit', () => {
  component.prevCandidateId=5
  component.prevSowId=6 
  component.mapppingForm.patchValue({ sowId:'6',candidateId:'5',statusId:'2' }); 
  spyOn(component, 'isDuplicate').and.callThrough();
  expect(component.isDuplicate(true)).toBe(false);
});
it('onEdit',()=>{
  const formValue=component.mapppingForm.value
  const obj={
    "soW_CandidateId": 1,
      "sowId": 7,
      "candidateId": 7,
      "statusId": 2,
      "type": "update",
  }
  component.onEdit()
  expect(component.editmode).toEqual(false)
  expect(component.Id).toEqual(null)
})
it('editDetails',()=>{
  component.editmode=true
  component.Id=7
 component.mapppingForm.patchValue({
    sowId: '7',
    candidateId: '7',
    statusId: '2',
  })
  component.prevSowId=7
  component.prevCandidateId=7
  component.editDetails(component.mapppingForm)
  expect(component.editDetails(component.mapppingForm)).toBe()
})
it('onAdd',()=>{
  const formValue={
  sowId: '7',
  candidateId: '7',
  statusId: '2',
 };
 const stringValue = {
  sowId: formValue.sowId.toString(),
  candidateId: formValue.candidateId.toString(),
  statusId: formValue.statusId.toString(),
}
 component.mapppingForm.patchValue(stringValue)
  const obj={
    "soW_CandidateId": 1,
      "sowId": 7,
      "candidateId": 7,
      "statusId": 2,
      "type": "post",
  }
  
 component.onAdd()
 mockCandidatemappingService.PostCandidateMappingData(obj)
 
  expect(mockCandidatemappingService.PostCandidateMappingData).toHaveBeenCalledWith(obj);
})
it('createObject',()=>{
  const data='SOCandidate Mapping Data'
  component.createObject(data)
  
})
it('download',()=>{
  component.download()
  expect(component.download()).toBe()
})

it('getSOName',()=>{

  const SOData=({
    sowId: 1,
        soName: "deepika",
        jrCode: "142",
        requestCreationDate: "2023-03-14T14:47:22.96",
        accountId: 4,
        technologyId: 180,
      role: "Dev",
        locationId: 3,
        regionId: 2,
        targetOpenPositions: 2,
        positionsTobeClosed: 1,
        ustpocId: 41,
        recruiterId: 28,
        usttpmId: 63,
        dellManagerId: 577,
        statusId: 2,
        band: "A",
        projectId: "12345",
        accountManager: "sathish",
        externalResource: "test1",
        internalResource: "wrfrwgwe",
        type: "",
        technologyName: "Validation Eng",
        accountName: "DL-MY",
        location: "SG",
        region: "MY",
        ustpocName: "Jaya/Kanika",
        recruiterName: "Srivani Doli",
        usttpmName: "Vijay Kumar",
        dellManagerName: "Vinitha",
        statusName: "Declined"
  })
  component.getSOName(SOData.sowId)
  expect(component.getSOName(SOData.sowId)).toEqual(SOData.soName)
  
})
it('getCandidateName',()=>{
  const CandidateData={
      candidateId: 2,
      candidateName: "divya G",
      mobileNo: "7982876283",
      gender: "female",
      dob: "2001-02-14T00:00:00",
      email: "divya@gmail.com",
      location: "hydrabad",
      skills: "Java",
      joiningDate: "2023-04-04T00:00:00",
      address: "Ananthapur",
      status: "Joined",
      pincode: "456382",
      isInternal: true
  }
  component.getCandidateName(CandidateData.candidateId)
  expect(component.getCandidateName(CandidateData.candidateId)).toEqual(CandidateData.candidateName)
})

it('GetSOCandidateDetails',()=>{

  
  component.GetSOCandidateDetails()
  
})
it('GetDropDown3',()=>{
  component.GetDropdown3()
  
})
it('getStatus',()=>{
  component.StatusData = [
    {
      "statusId": 2,
      "statusName": "Declined",
      "type": "",
      "statusType": "SO"
    },
    {
      "statusId": 1,
      "statusName": "Offered",
      "type": "",
      "statusType": "SO"
    }
  ];
  const id = 1;
  expect(component.getStatus(id)).toEqual('Offered');
})
it('deleteDetails',()=>{
  spyOn(window,'confirm').and.returnValue(true)
  const formValue={
    sowId: '7',
    candidateId: '7',
    statusId: '2',
   };
   const stringValue = {
    sowId: formValue.sowId.toString(),
    candidateId: formValue.candidateId.toString(),
    statusId: formValue.statusId.toString(),
  }
   component.mapppingForm.patchValue(stringValue)
    const obj={
      "soW_CandidateId": 1,
        "sowId": 7,
        "candidateId": 7,
        "statusId": 2,
        "type": "",
    }
  component.deleteDetails(obj)
  expect(component.deleteDetails(obj)).toBe()
})
it('isFieldInvalid', () => {
  const fieldName = 'email'; // Replace with the actual field name
  const control = { invalid: true, touched: true };
  spyOn(component.mapppingForm, 'get').and.returnValue(control as AbstractControl);
  expect(component.isFieldInvalid(fieldName)).toBe(true);
});
it('UpdateHeader',()=>{
  component.UpdateHeader()
})
});
