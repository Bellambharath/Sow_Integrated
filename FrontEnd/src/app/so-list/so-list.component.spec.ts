import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoListComponent } from './so-list.component';
import { SOWService } from '../services/sow.service';
import { RegionserviceService } from '../services/regionservice.service';
import { LocationserviceService } from '../services/locationservice.service';
import { AccountserviceService } from '../services/accountservice.service';
import { UsttpmserviceService } from '../services/usttpmservice.service';
import { UstpocserviceService } from '../services/ustpocservice.service';
import { RecruiterserviceService } from '../services/recruiterservice.service';
import { DellmanagerserviceService } from '../services/dellmanagerservice.service';
import { StatusserviceService } from '../services/statusservice.service';
import { TechnologyService } from '../services/technology.service';
import { CandidatemappingService } from '../services/candidatemapping.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AbstractControl } from '@angular/forms';

describe('SoListComponent', () => {
  let component: SoListComponent;
  let fixture: ComponentFixture<SoListComponent>;
  let mockSOWService,mockRegionserviceService,mockLocationserviceService,
  mockAccountserviceService,mockUsttpmserviceService,mockUstpocserviceService,mockRecruiterserviceService,
  mockDellmanagerserviceService,mockStatusserviceService,mockTechnologyService,mockCandidatemappingService,
  mockExcelService,mockLoginService,mockActivatedRoute,mocksodata;
  let mockActivatedRoutes = {snapshot:{queryParams:{editMode:1}}};
  let mockRouter={navigate:{value:1}}
  beforeEach(async () => {
    mockSOWService=jasmine.createSpyObj('SOWService',['GetAllSowData','PostSOWDuplicateCheck',
  'PostSowData','DeleteSowData','UpdateSowData','GetSowById','GetSOByDate'])
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot', 'queryParams'])
    mockAccountserviceService=jasmine.createSpyObj('AccountserviceService',['GetAllAccountData'])
    mockTechnologyService=jasmine.createSpyObj('TechnologyService',['GetAllTechData'])
    mockRecruiterserviceService=jasmine.createSpyObj('RecruiterserviceService',['GetAllRecruiterData'])
    mockUstpocserviceService=jasmine.createSpyObj('UstpocserviceService',['GetAllUstPocData'])
    mockDellmanagerserviceService=jasmine.createSpyObj('DellmanagerserviceService',['GetAllDellManagerData'])
    mockStatusserviceService=jasmine.createSpyObj('StatusserviceService',['GetAllStatusData','GetStatusByType'])
    mockRegionserviceService=jasmine.createSpyObj('RegionserviceService',['GetAllRegionData'])
    mockUsttpmserviceService=jasmine.createSpyObj('UsttpmserviceService',['GetAllUSTTPMData'])
    mockLocationserviceService=jasmine.createSpyObj('LocationserviceService',['GetAllLocationData','GetLocationByRegionId'])
    mockCandidatemappingService=jasmine.createSpyObj('CandidatemappingService',['GetAllCandidateMappingData'])
    mockRouter=jasmine.createSpyObj('Router',['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ SoListComponent ],
      providers:[{provide:SOWService,useValue:mockSOWService},
        {provide:RegionserviceService,useValue:mockRegionserviceService},
      {provide:LocationserviceService,useValue:mockLocationserviceService},
      {provide:AccountserviceService,useValue:mockAccountserviceService},
    {provide:UsttpmserviceService,useValue:mockUsttpmserviceService},
    {provide:UstpocserviceService,useValue:mockUstpocserviceService},
    {provide:RecruiterserviceService,useValue:mockRecruiterserviceService},
  {provide:DellmanagerserviceService,useValue:mockDellmanagerserviceService},
  {provide:StatusserviceService,useValue:mockStatusserviceService},
{provide:TechnologyService,useValue:mockTechnologyService},
{provide:CandidatemappingService,useValue:mockCandidatemappingService},
{provide:ExcelService,useValue:mockExcelService},
{provide:LoginService,useValue:mockLoginService},
{provide:ActivatedRoute,useValue:mockActivatedRoutes},
{provide:Router,useValue:mockRouter}]
    })
    .compileComponents();
    mocksodata=[
      {
        "sowId": 13,
        "soName": "prathyusha",
        "jrCode": "1234",
        "requestCreationDate": "2023-04-04T13:06:55.02",
        "accountId": 4,
        "technologyId": 180,
        "role": "Developer",
        "locationId": 2,
        "regionId": 3,
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
        "location": "HYD",
        "region": "SG",
        "ustpocName": "Jaya/Kanika",
        "recruiterName": "Srivani Doli",
        "usttpmName": "Vijay Kumar",
        "dellManagerName": "Vinitha",
        "statusName": "Declined"
      },
      {
        "sowId": 12,
        "soName": "test12353456tred",
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
        "sowId": 11,
        "soName": "test123",
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
        "sowId": 10,
        "soName": "Bhagya1",
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
      }]
    fixture = TestBed.createComponent(SoListComponent);
    component = fixture.componentInstance;
   component.editMode=1

   mockSOWService.GetSowById.and.returnValue(of(mocksodata))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get f',()=>{
    expect(component.SowForm.controls).toEqual(component.f)
  })
  it('onSubmit,should call onEdit',()=>{
    component.SowForm.patchValue({
      soName: "Bhagya1",
      jrCode: "14",
      requestCreationDate: "2023-04-04T13:26:08.807",
      accountId: "3",
      technologyId: '175',
      role: "admin",
      locationId: '3',
      regionId: '3',
      targetOpenPositions: '1',
      positionsTobeClosed: '1',
      ustpocId: '37',
      recruiterId: '27',
      usttpmId: '66',
      dellManagerId: '573',
      statusId: '3',
      band: "A",
      projectId: "dhhef",
      accountManager: "mahesh",
      externalResource: "test1",
      internalResource: "chaithra",
    })
    component.editMode=true
    spyOn(component,'onEdit')
    component.onEdit()
    component.onSubmit()
    expect(component.onEdit()).toBe()
  })
  it('onSubmit,should call onAdd',()=>{
    component.SowForm.patchValue({
      soName: "Bhagya1",
      jrCode: "14",
      requestCreationDate: "2023-04-04T13:26:08.807",
      accountId: "3",
      technologyId: '175',
      role: "admin",
      locationId: '3',
      regionId: '3',
      targetOpenPositions: '1',
      positionsTobeClosed: '1',
      ustpocId: '37',
      recruiterId: '27',
      usttpmId: '66',
      dellManagerId: '573',
      statusId: '3',
      band: "A",
      projectId: "dhhef",
      accountManager: "mahesh",
      externalResource: "test1",
      internalResource: "chaithra",
    })
    component.editMode=false
    spyOn(component,'onAdd')
    component.onAdd()
    component.onSubmit()
    expect(component.onAdd()).toBe()
  })
  it('onSubmit,should call onAdd',()=>{
    component.SowForm.patchValue({
      soName: "",
      jrCode: "",
      requestCreationDate: "",
      accountId: "",
      technologyId: '',
      role: "",
      locationId: '',
      regionId: '',
      targetOpenPositions: '',
      positionsTobeClosed: '',
      ustpocId: '',
      recruiterId: '',
      usttpmId: '',
      dellManagerId: '',
      statusId: '',
      band: "",
      projectId: "",
      accountManager: "",
      externalResource: "",
      internalResource: "",
    })
    component.onSubmit()
  })
  it('onAdd',()=>{
    const obj={
      soName: "Bhagya1",
      jrCode: "14",
      requestCreationDate: "2023-04-04T13:26:08.807",
      accountId: "3",
      technologyId: '175',
      role: "admin",
      locationId: '3',
      regionId: '3',
      targetOpenPositions: '1',
      positionsTobeClosed: '1',
      ustpocId: '37',
      recruiterId: '27',
      usttpmId: '66',
      dellManagerId: '573',
      statusId: '3',
      band: "A",
      projectId: "dhhef",
      accountManager: "mahesh",
      externalResource: "test1",
      internalResource: "chaithra",
      type:"insert"
    }
    mockSOWService.PostSowData.and.returnValue(of(obj))
    component.onAdd()
    expect(component.onAdd)
  })
  it('onEdit',()=>{
    const obj={
      sowId:10,
      soName: "Bhagya1",
      jrCode: "14",
      requestCreationDate: "2023-04-04T13:26:08.807",
      accountId: "3",
      technologyId: '175',
      role: "admin",
      locationId: '3',
      regionId: '3',
      targetOpenPositions: '1',
      positionsTobeClosed: '1',
      ustpocId: '37',
      recruiterId: '27',
      usttpmId: '66',
      dellManagerId: '573',
      statusId: '3',
      band: "A",
      projectId: "dhhef",
      accountManager: "mahesh",
      externalResource: "test1",
      internalResource: "chaithra",
      type:"insert"
    }
    mockSOWService.UpdateSowData.and.returnValue(of(obj.sowId,obj))
    component.onEdit()
    expect(component.editMode).toEqual(false)
    expect(component.Id).toEqual(null)
  })
  it('onEdit',()=>{
   mockSOWService.UpdateSowData.and.returnValue(throwError(()=>{
    new Error("Data not updated")
   }))
    component.onEdit()
  })
  it('GetDropdown1',()=>{
    const obj= {
      "accountId": 1,
      "accountName": "DL-IN",
      "type": ""
    }
    mockAccountserviceService.GetAllAccountData.and.returnValue(of(obj))
    component.GetDropdown1()
    expect(component.GetDropdown1()).toBeTruthy()
  })
  it('GetDropdown2',()=>{
    const obj= {
      "technologyId": 188,
          "technologyName": "XSLT and XSLFO ",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
    }
    mockTechnologyService.GetAllTechData.and.returnValue(of(obj))
    component.GetDropdown2()
    expect(component.GetDropdown2()).toBeTruthy()
  })
  it('GetDropdown3',()=>{
    const obj= {
      "recruiterId": 31,
            "recruiterName": "Varnitha",
            "type": ""
    }
    mockRecruiterserviceService.GetAllRecruiterData.and.returnValue(of(obj))
    component.GetDropdown3()
    expect(component.GetDropdown3()).toBeTruthy()
  })
  it('GetDropdown4',()=>{
    const obj= {
      "ustpocId": 38,
      "ustpocName": "Sirisha/Hema",
      "type": ""
    }
    mockUstpocserviceService.GetAllUstPocData.and.returnValue(of(obj))
    component.GetDropdown4()
    expect(component.GetDropdown4()).toBeTruthy()
  })
  it('GetDropdown5',()=>{
    const obj= {
      "dellManagerId": 586,
      "dellManagerName": "Viswa",
      "type": ""
    }
    mockDellmanagerserviceService.GetAllDellManagerData.and.returnValue(of(obj))
    component.GetDropdown5()
    expect(component.GetDropdown5()).toBeTruthy()
  })
  it('getStatus',()=>{
    const obj= {
      "statusId": 2,
      "statusName": "Declined",
      "type": "",
      "statusType": "SO"
    }
    mockStatusserviceService.GetAllStatusData.and.returnValue(of(obj))
    component.getStatus()
    expect(component.getStatus()).toBeTruthy()
  })
  it('GetStatusByType',()=>{
    const obj= {
      "statusId": 2,
      "statusName": "Declined",
      "type": "",
      "statusType": "SO"
    }
    mockStatusserviceService.GetStatusByType.and.returnValue(of(obj))
    component.GetStatusByType()
    expect(component.GetStatusByType()).toBeTruthy()
  })
  it('GetDropdown8',()=>{
    const obj=  {
      "usttpmId": 69,
      "usttpmName": "Udaya Punnani",
      "type": ""
    }
    mockUsttpmserviceService.GetAllUSTTPMData.and.returnValue(of(obj))
    component.GetDropdown8()
    expect(component.GetDropdown8()).toBeTruthy()
  })
  it('GetDropdown7',()=>{
    const obj=  {
      "regionId": 4,
      "region": "US",
      "type": ""
    }
    mockRegionserviceService.GetAllRegionData.and.returnValue(of(obj))
    component.GetDropdown7()
    expect(component.GetDropdown7()).toBeTruthy()
  })
  it('GetDropdown9',()=>{
    const obj=  {
      "locationId": 5,
      "location": "BNG",
      "regionId": 1,
      "type": ""
    }
    mockLocationserviceService.GetLocationByRegionId.and.returnValue(of(obj.regionId))
    component.GetDropdown9(obj.regionId)
    expect(component.GetDropdown9(obj.regionId)).toBeTruthy()
  })
  it('GetDropdown10',()=>{
    const obj= {
      "soW_CandidateId": 2,
      "sowId": 6,
      "candidateId": 5,
      "statusId": 2,
      "type": "",
      "soName": "prathyusha123",
      "candidateName": "prathyushareddy12",
      "statusName": "Declined"
    }
    mockCandidatemappingService.GetAllCandidateMappingData.and.returnValue(of(obj))
    component.GetDropdown10()
    expect(component.GetDropdown10()).toBeTruthy()
  })

  it('canExit',()=>{
    component.canExit()
    
  })
  it('cancel',()=>{
    component.cancel()
  })
  it('should prompt confirmation when SowForm is dirty', () => {
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    component.SowForm.markAsDirty(); 
   component.canExit(); 
    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved changes. Do you really want to discard these changes?');
    expect(component.canExit()).toBeTrue();
  });
  it('isFieldInvalid',()=>{
    const fieldName='R&D'
    const control={invalid:true,touched:true}
    spyOn(component.SowForm,'get').and.returnValue(control as AbstractControl)
    expect(component.isFieldInvalid(fieldName)).toBe(true)
  })
  it('onRegionSelected',()=>{
    spyOn(component,'GetDropdown9')
    component.onRegionSelected('1')
    expect(component.isRegionSelected).toEqual(true)
  })

});
