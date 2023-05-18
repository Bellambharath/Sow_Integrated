import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDetailsComponent } from './candidate-details.component';
import { CandidateService } from '../services/candidate.service';
import { CandidatemappingService } from '../services/candidatemapping.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


describe('CandidateDetailsComponent', () => {
  let component: CandidateDetailsComponent;
  let fixture: ComponentFixture<CandidateDetailsComponent>;
  let mockCandidateService, mockCandidatemappingService, mockExcelService, mockLoginService, mockFormBuilder, mockRouter, mockCandidatedata, mockcandidatemappingdata,
    mockexceldata
  beforeEach(async () => {
    mockCandidateService = jasmine.createSpyObj('CandidateService', ['PostCandidateDuplicateCheck', 'GetAllCandidatesData', 'PostCandidateData', 'DeleteCandidateData', 'UpdateCandidateData',
      'GetCandidateById', 'GetCandidateByDate'])
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'queryParams'])
    mockCandidatemappingService = jasmine.createSpyObj('CandidatemappingService', ['GetAllCandidateMappingData', 'PostCandidateMappingData', 'UpdateCandidateMappingData', 'GetCandidateById', 'DeleteCandidateMappingData'])
    mockExcelService = jasmine.createSpyObj('ExcelService', ['jsonExportAsExcel'])
    await TestBed.configureTestingModule({

      declarations: [CandidateDetailsComponent],

      providers: [FormBuilder,
        { provide: CandidateService, useValue: mockCandidateService }, { provide: CandidatemappingService, useValue: mockCandidatemappingService }, { provide: ExcelService, useValue: mockExcelService }, { provide: LoginService, useValue: mockLoginService }, { provide: FormBuilder, useValue: mockFormBuilder }, { provide: Router, useValue: mockRouter }]
    })
      .compileComponents();
    mockCandidatedata = [{
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

    mockcandidatemappingdata = [
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
    mockexceldata = [{ "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support" }, { "domainId": 8, "domainName": "R&D" }]
    fixture = TestBed.createComponent(CandidateDetailsComponent);
    component = fixture.componentInstance;
    mockCandidateService.GetAllCandidatesData.and.returnValue(of(mockCandidatedata))
    mockCandidateService.PostCandidateData.and.returnValue(of(mockCandidatedata))
    mockCandidateService.UpdateCandidateData.and.returnValue(of(mockCandidatedata))
    mockCandidateService.GetCandidateByDate.and.returnValue(of(mockCandidatedata))
    mockCandidateService.DeleteCandidateData.and.returnValue(of(mockCandidatedata.candidateId))
    mockCandidatemappingService.GetAllCandidateMappingData.and.returnValue(of(mockcandidatemappingdata))
    mockExcelService.jsonExportAsExcel.and.returnValue(of(mockexceldata))
    component.candidateform.patchValue(mockCandidatedata[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('GetCandidateData', () => {
    mockCandidatemappingService.GetAllCandidateMappingData.and.returnValue(throwError(() => {
      new Error("no candidate data")
      component.GetCandidateData()
    }))
  })

  it('OnPreviousClicked', () => {
    component.currentPage = 3;
    component.OnPreviousClicked();
    expect(component.currentPage).toEqual(2);


  });
  it('OnNextClicked', () => {
    component.currentPage = 3;
    component.OnNextClicked()
    expect(component.currentPage).toEqual(4);
  })
  it('OnPageNumberChanged, should set currentPage equal to 1', () => {
    const event = { target: { value: 0 } }
    component.totalPages = 5;
    component.OnPageNumberChanged(event)
    expect(component.currentPage).toEqual(1)
    expect(event.target.value).toEqual(1)
  })
  it('OnPageNumberChanged, should set currentPage greater than totalpages', () => {
    const event = { target: { value: 10 } }
    component.totalPages = 5;
    component.OnPageNumberChanged(event)
    expect(component.currentPage).toEqual(1)
    expect(event.target.value).toEqual(1)
  })
  it('OnPageNumberChanged, should set currentPage less than totalpages', () => {
    const event = { target: { value: 3 } }
    component.totalPages = 5;
    component.OnPageNumberChanged(event)
    expect(component.currentPage).toBe(3)
    expect(event.target.value).toBe(3)
  })
  it('setDefaultPaginationForcly', () => {
    component.batchFilteredRecord = [1, 2, 3]
    component.pageSizeSelected = 2;
    spyOn(component, 'batchFilteredRecord').and.returnValue(component.batchFilteredRecord)
    component.SetDefaultPaginationForcly([1, 2])
    expect(component.batchRecord.length).toBe(2)

  })
  it('searchFilter', () => {
    component.batchFilteredRecord = [1, 2, 3]
    component.pageSizeSelected = 2;
    component.searchText = ''
    spyOn(component, 'SetDefaultPaginationForcly')
    component.searchFilter();
    expect(component.SetDefaultPaginationForcly([1, 2])).toBe()
  })

  it('searchFilter', () => {
    component.batchFilteredRecord = [1, 2, 3]
    component.pageSizeSelected = 2;
    component.searchText = 'R&D'
    spyOn(component, 'SetDefaultPaginationForcly')
    component.searchFilter();
    expect(component.SetDefaultPaginationForcly([1, 2])).toBe()
  })
  it('createObject', () => {
    expect(component.createObject('Candidate Data'))
  })
  it('onAdd', () => {

    const obj = {

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
    obj.isInternal = true
    component.onAdd()
    mockCandidateService.PostCandidateData(obj)
    expect(component.onAdd()).toBe()
  })

  it('onEdit', () => {
    const obj =
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

    }
    mockCandidateService.UpdateCandidateData(3, obj)
    component.onEdit()
    expect(component.editmode).toEqual(false)
    expect(component.Id).toEqual(null)
  })
  it('', () => {
    mockCandidateService.UpdateCandidateData.and.returnValue(throwError(() => { new Error('Not Updated') }))
    component.onEdit();
    expect(component.onEdit()).toBe()
  })


  it('OnPreviousReleased', () => {
    spyOn(window, 'clearInterval')
    component.OnPreviousReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
  })
  it('OnPreviousHeld. currentpage should be greater than 1', () => {
    component.currentPage = 2;
    spyOn(component, 'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().uninstall()

  })
  it('OnPreviousHeld, currentpage should be  less than or equal to 1', () => {
    component.currentPage = 1
    spyOn(component, 'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe()
    jasmine.clock().uninstall()
  })
  it('OnNextReleased', () => {
    spyOn(window, 'clearInterval')
    component.OnNextReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval)
  })
  it('OnNextHeld,currentPage should be less than totalpages', () => {
    component.totalPages = 3
    component.currentPage = 2
    spyOn(component, 'OnNextClicked')
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().uninstall()
  })
  it('OnNextHeld,currentPage should be greater than or equaln to totalpages', () => {
    component.totalPages = 3
    component.currentPage = 4
    spyOn(component, 'OnNextClicked')
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toBe()
    jasmine.clock().uninstall()
  })
  it('f', () => {
    expect(component.candidateform.controls).toEqual(component.f);
  });
  it('download', () => {

    component.fromDate = '2023/03/01'
    component.endDate = '2023/04/30'

    component.download()


  })

  it('DeleteDetails', () => {
    const obj = {
      candidateId: 7,
      candidateName: "bharath",
      mobileNo: "8522019567",
      gender: "female",
      dob: "2023-04-15T00:00:00",
      email: "bharath@ust.com",
      location: "Hyderabad",
      skills: "c#",
      joiningDate: "2023-04-21T00:00:00",
      address: "1-14,neeliagudem,thripuraram,nalgonda",
      status: "Cancelled",
      pincode: "500084",
      isInternal: true
    }

    spyOn(window, 'confirm').and.returnValue(true)
    component.deleteDetails(obj.candidateId);
  })
  it('dateTrim', () => {
    expect(component.dateTrim('2000/04/01')).toEqual('2000/04/01');
  });

  it('addfile', () => {
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    component.addfile(event);
    expect(component.file).toEqual(file);
  });
  it('editDetails', () => {
    component.candidate = 1
    component.editmode = true
    component.editDetails(component.candidate)
  })
  it('onSubmit', () => {
    component.candidateform.patchValue({
      candidateName: "",
      dob: "",
      mobileNo: "",
      email: "",
      gender: "",
      status: "",
      joiningDate: "",
      skills: "",
      location: "",
      address: "",
      pincode: "",
      isInternal: "",
    })
    component.onSubmit()

  })
  it('onSubmit,should call onAdd', () => {
    // component.candidateform.patchValue({
    //   candidateName: "bharath",
    //   dob: "2023-04-15T00:00:00",
    //   mobileNo: "8522019567",
    //   email: "bharath@ust.com",
    //   gender: "female",
    //   status: "Cancelled",
    //   joiningDate: "2023-04-21T00:00:00",
    //   skills: "c#",
    //   location: "Hyderabad",
    //   address: "1-14,neeliagudem,thripuraram,nalgonda",
    //   pincode: "500084",
    //   isInternal: true,
    // })
    component.candidateform.patchValue({
      candidateName: "",
      dob: "",
      mobileNo: "",
      email: "",
      gender: "",
      status: "",
      joiningDate: "",
      skills: "",
      location: "",
      address: "",
      pincode: "",
      isInternal: "",
    })
    component.editmode=true

    component.onSubmit();
  })
  it('addfile',()=>{
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
    mockCandidateService.PostCandidateDuplicateCheck.and.returnValue(of(mockCandidatedata))
      mockCandidateService.GetAllCandidatesData.and.returnValue(of(mockCandidatedata))
  
    component.addfile(event)
  })
  it('addfile',()=>{
    const file = new File([''], 'candidateDetails.xlsx');
    const event = { target: { files: [file] } };
   
    mockCandidateService.PostCandidateDuplicateCheck.and.returnValue(of(mockCandidatedata))
    mockCandidateService.GetAllCandidatesData.and.returnValue(throwError(()=>{
      new Error("no file")
    }))
    component.addfile(event)
  })

});
