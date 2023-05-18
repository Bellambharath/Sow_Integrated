import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateListComponent } from './candidate-list.component';
import { CandidateService } from '../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { StatusserviceService } from '../services/statusservice.service';
import { of, throwError } from 'rxjs';
import { AbstractControl } from '@angular/forms';

describe('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;
  let mockCandidateService, mockActivatedRoute, mockCommonService, mockRouter,
    mockStatusserviceService, mockcandidatedata, mockstatusdata;
  let mockActivatedRoutes = { snapshot: { queryParams: { editMode: 1 } } }
  beforeEach(async () => {
    mockCandidateService = jasmine.createSpyObj('CandidateService', ['PostCandidateDuplicateCheck', 'GetAllCandidatesData', 'PostCandidateData',
      'DeleteCandidateData', 'UpdateCandidateData', 'GetCandidateById', 'GetCandidateByDate'])
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'queryParams'])
    mockCommonService = jasmine.createSpyObj('CommonService', ['loadComponent', 'headerContent'])
    mockStatusserviceService = jasmine.createSpyObj('StatusserviceService', ['GetStatusByType'])
    mockRouter = jasmine.createSpyObj('Router', ['navigate'])
    await TestBed.configureTestingModule({
      declarations: [CandidateListComponent],
      providers: [
        { provide: CandidateService, useValue: mockCandidateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoutes },
        { provide: CommonService, useValue: mockCommonService },
        { provide: StatusserviceService, useValue: mockStatusserviceService },
        { provide: Router, useValue: mockRouter }]
    })
      .compileComponents();
    mockstatusdata = mockstatusdata = [{
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
    }]
    mockcandidatedata = [{
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
    fixture = TestBed.createComponent(CandidateListComponent);
    component = fixture.componentInstance;
    component.editMode = 1;
    //mockCommonService.headerContent.and.returnValue(of(true))
    mockCandidateService.GetCandidateById.and.returnValue(of(mockcandidatedata))
    mockCandidateService.PostCandidateData.and.returnValue(of(mockcandidatedata))
    mockStatusserviceService.GetStatusByType.and.returnValue(of(mockstatusdata))
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component.editMode);
    expect(component).toBeTruthy();
  });
  it('f', () => {
    expect(component.candidateform.controls).toEqual(component.f)
  })
  it('dateTrim', () => {
    expect(component.dateTrim("2020/03/01")).toEqual("2020/03/01")
  })
  it("onSubmit,should call onEdit", () => {
    component.candidateform.patchValue({
      candidateName: "Deepika A",
      dob: "2000-04-03T00:00:00",
      address: "Ananthapur",
      email: "akuladeepika431@gmail.com",
      gender: "female",
      joiningDate: "2023-03-03T00:00:00",
      location: "Bangalore",
      mobileNo: "9182737383",
      pincode: "456382",
      skills: "Angular",
      status: "Rejected",
      isInternal: true
    })
    component.editMode = true
    spyOn(component, 'onEdit')
    component.onSubmit()
    expect(component.onEdit()).toBe()
  })

  it("onSubmit,should call onAdd", () => {
    component.candidateform.patchValue({
      candidateName: "Deepika A",
      dob: "2000-04-03T00:00:00",
      address: "Ananthapur",
      email: "akuladeepika431@gmail.com",
      gender: "female",
      joiningDate: "2023-03-03T00:00:00",
      location: "Bangalore",
      mobileNo: "9182737383",
      pincode: "456382",
      skills: "Angular",
      status: "Rejected",
      isInternal: true
    })
    component.editMode = false
    spyOn(component, 'onAdd')
    component.onSubmit()
    expect(component.onAdd()).toBe()
  })
  it('cancel', () => {
    component.cancel()
  })
  it('onSubmit', () => {
    component.candidateform.patchValue({
      candidateName: "",
      dob: "",
      address: "",
      email: "",
      gender: "",
      joiningDate: "",
      location: "",
      mobileNo: "",
      pincode: "",
      skills: "",
      status: "",
      isInternal: true
    })
    component.onSubmit()
  })
  it('onAdd', () => {
    component.onAdd()
  })
  it('onEdit', () => {
    const obj = {
      candidateId: 1,
      candidateName: "Deepika A",
      dob: "2000-04-03T00:00:00",
      address: "Ananthapur",
      email: "akuladeepika431@gmail.com",
      gender: "female",
      joiningDate: "2023-03-03T00:00:00",
      location: "Bangalore",
      mobileNo: "9182737383",
      pincode: "456382",
      skills: "Angular",
      status: "Rejected",
      isInternal: true
    }
    mockCandidateService.UpdateCandidateData.and.returnValue(of(obj))
    component.onEdit()
    expect(component.editMode).toEqual(false)
    expect(component.Id).toEqual(null)
  })
  it('', () => {
    mockCandidateService.UpdateCandidateData.and.returnValue(throwError(() => { new Error('Not Updated') }))
    component.onEdit();
    expect(component.onEdit()).toBe()
  })

  it('canExit', () => {
    component.canExit()
  })
  it('GetStatusByType', () => {
    component.GetStatusByType()
  })
  it('isFieldInvalid', () => {
    const fieldName = 'email'; // Replace with the actual field name
    const control = { invalid: true, touched: true };
    spyOn(component.candidateform, 'get').and.returnValue(control as AbstractControl);
    expect(component.isFieldInvalid(fieldName)).toBe(true);
  });
  it('should prompt confirmation when SowForm is dirty', () => {

    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);

    component.candidateform.markAsDirty();

    component.canExit();

    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Do you really want to discard these changes?');

    expect(component.canExit()).toBeTrue();

  });

});
