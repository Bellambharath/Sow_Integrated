import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOWComponent } from './sow.component';
import { SOWService } from '../services/sow.service';
import { RegionserviceService } from '../services/regionservice.service';
import { AccountserviceService } from '../services/accountservice.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { CandidatemappingService } from '../services/candidatemapping.service';
import { StatusserviceService } from '../services/statusservice.service';
import { TechnologyService } from '../services/technology.service';
import { DellmanagerserviceService } from '../services/dellmanagerservice.service';
import { RecruiterserviceService } from '../services/recruiterservice.service';
import { UsttpmserviceService } from '../services/usttpmservice.service';
import { LocationserviceService } from '../services/locationservice.service';
import { UstpocserviceService } from '../services/ustpocservice.service';
import { of, throwError } from 'rxjs';


describe('SOWComponent', () => {
  let component: SOWComponent;
  let fixture: ComponentFixture<SOWComponent>;
  let mockSOWService,mockRegionserviceService,mockLocationserviceService
  ,mockAccountserviceService,mockUsttpmserviceService,mockUstpocserviceService
  ,mockRecruiterserviceService,mockDellmanagerserviceService,
  mockStatusserviceService,mockTechnologyService,mockCandidatemappingService,
  mockExcelService,mockLoginService,mockRouter,mocksowdata,mockcandidatemappingdata,
  mockaccountdata,mocktechdata,mockrecdata,mocklocationdata,mocktpmdata,mockregiondata,
  mockstatusdata,mockdellmanagerdata,mocktpodata,mockexceldata
  beforeEach(async () => {
    mockSOWService=jasmine.createSpyObj('SOWService',['GetAllSowData','PostSOWDuplicateCheck','PostSowData','DeleteSowData',
  'UpdateSowData','GetSowById','GetSOByDate'])
  mockCandidatemappingService=jasmine.createSpyObj('CandidatemappingService',['GetAllCandidateMappingData','PostCandidateMappingData','DeleteCandidateMappingData','UpdateCandidateMappingData',
'GetCandidateById'])
mockAccountserviceService=jasmine.createSpyObj('AccountserviceService',['GetAllAccountData'])
mockTechnologyService=jasmine.createSpyObj('TechnologyService',['GetAllTechData'])
mockRecruiterserviceService=jasmine.createSpyObj('RecruiterserviceService',['GetAllRecruiterData'])
mockUstpocserviceService=jasmine.createSpyObj('UstpocserviceService',['GetAllUstPocData'])
mockDellmanagerserviceService=jasmine.createSpyObj('DellmanagerserviceService',['GetAllDellManagerData'])
mockStatusserviceService=jasmine.createSpyObj('StatusserviceService',['GetAllStatusData','GetStatusByType'])
mockRegionserviceService=jasmine.createSpyObj('RegionserviceService',['GetAllRegionData'])
mockUsttpmserviceService=jasmine.createSpyObj('mockUsttpmserviceService',['GetAllUSTTPMData'])
mockLocationserviceService=jasmine.createSpyObj('LocationserviceService',['GetAllLocationData'])
mockExcelService=jasmine.createSpyObj('ExcelService',['jsonExportAsExcel'])
mockRouter=jasmine.createSpyObj('Router',['navigate','queryParams'])
    await TestBed.configureTestingModule({
      declarations: [ SOWComponent ],
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
{provide:Router,useValue:mockRouter}]
    })

    .compileComponents();
    mocktpodata=[
      {
        "ustpocId": 42,
        "ustpocName": "Rakshitha B / MoonRaft",
        "type": ""
      },
      {
        "ustpocId": 41,
        "ustpocName": "Jaya/Kanika",
        "type": ""
      },
      {
        "ustpocId": 40,
        "ustpocName": "Rakshitha/Sagarika",
        "type": ""
      },
      {
        "ustpocId": 39,
        "ustpocName": "Chitra",
        "type": ""
      },
      {
        "ustpocId": 38,
        "ustpocName": "Sirisha/Hema",
        "type": ""
      }]
    mocktpmdata=[
      {
        "usttpmId": 69,
        "usttpmName": "Udaya Punnani",
        "type": ""
      },
      {
        "usttpmId": 68,
        "usttpmName": "Chand Shaik",
        "type": ""
      },
      {
        "usttpmId": 67,
        "usttpmName": "Naga Kasireddy",
        "type": ""
      },
      {
        "usttpmId": 66,
        "usttpmName": "Lakshmi Narasimha Rao Kovuru",
        "type": ""
      },
      {
        "usttpmId": 65,
        "usttpmName": "Venkat Peram",
        "type": ""
      }]    
    mockregiondata=[
      {
        "regionId": 4,
        "region": "US",
        "type": ""
      },
      {
        "regionId": 3,
        "region": "SG",
        "type": ""
      },
      {
        "regionId": 2,
        "region": "MY",
        "type": ""
      },
      {
        "regionId": 1,
        "region": "IN",
        "type": ""
      }
    ]
  mockstatusdata=[
    {
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
  mockdellmanagerdata=[
    {
      "dellManagerId": 587,
      "dellManagerName": "Viswa k",
      "type": ""
    },
    {
      "dellManagerId": 586,
      "dellManagerName": "Viswa",
      "type": ""
    },
    {
      "dellManagerId": 585,
      "dellManagerName": "Vishwanath Megnath",
      "type": ""
    },
    {
      "dellManagerId": 583,
      "dellManagerName": "Vishwa BR",
      "type": ""
    },
    {
      "dellManagerId": 581,
      "dellManagerName": "Vishwa",
      "type": ""
    }]
    mockaccountdata=[
      {
        "accountId": 5,
        "accountName": "DL_N",
        "type": ""
      },
      {
        "accountId": 4,
        "accountName": "DL-MY",
        "type": ""
      },
      {
        "accountId": 3,
        "accountName": "DL-USTI",
        "type": ""
      },
      {
        "accountId": 2,
        "accountName": "DL-US",
        "type": ""
      },
      {
        "accountId": 1,
        "accountName": "DL-IN",
        "type": ""
      }
    ]
    mocksowdata=[
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
      },
      {
        "sowId": 9,
        "soName": "pra",
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
      }]
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
      mocktechdata=[
        {
          "technologyId": 188,
          "technologyName": "XSLT and XSLFO ",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 187,
          "technologyName": "XQUERY Dev",
          "domainId": 11,
          "type": "",
          "domainName": "App Dev"
        },
        {
          "technologyId": 186,
          "technologyName": "Winforms",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 185,
          "technologyName": "Windows OS Plat",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 184,
          "technologyName": "Windows App UI Developer ",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 183,
          "technologyName": "Window system Engg",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 182,
          "technologyName": "Window Driver",
          "domainId": 8,
          "type": "",
          "domainName": "R&D"
        },
        {
          "technologyId": 181,
          "technologyName": "Weblogic Admin",
          "domainId": 6,
          "type": "",
          "domainName": "Others"
        },
        {
          "technologyId": 180,
          "technologyName": "Validation Eng",
          "domainId": 8,
          "type": "",
          "domainName": "R&D"
        }]
        mockrecdata=[
          {
            "recruiterId": 31,
            "recruiterName": "Varnitha",
            "type": ""
          },
          {
            "recruiterId": 30,
            "recruiterName": "Sumant G",
            "type": ""
          },
          {
            "recruiterId": 29,
            "recruiterName": "Suman K",
            "type": ""
          },
          {
            "recruiterId": 28,
            "recruiterName": "Srivani Doli",
            "type": ""
          },
          {
            "recruiterId": 27,
            "recruiterName": "Srinivas",
            "type": ""
          }]
          mocklocationdata=[
            {
              "locationId": 5,
              "location": "BNG",
              "regionId": 1,
              "type": ""
            },
            {
              "locationId": 4,
              "location": "MY",
              "regionId": 2,
              "type": ""
            },
            {
              "locationId": 3,
              "location": "SG",
              "regionId": 3,
              "type": ""
            },
            {
              "locationId": 2,
              "location": "HYD",
              "regionId": 1,
              "type": ""
            },
            {
              "locationId": 1,
              "location": "US",
              "regionId": 4,
              "type": ""
            }
          ]
          mockexceldata=[ { "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support"}, { "domainId": 8, "domainName": "R&D" }]

    fixture = TestBed.createComponent(SOWComponent);
    component = fixture.componentInstance;
     mockSOWService.GetAllSowData.and.returnValue(of(mocksowdata))
    mockSOWService.UpdateSowData.and.returnValue(of(mocksowdata))
    mockSOWService.PostSowData.and.returnValue(of(mocksowdata))
     mockCandidatemappingService.UpdateCandidateMappingData.and.returnValue(of(component.Id, mockcandidatemappingdata))
     mockCandidatemappingService.PostCandidateMappingData.and.returnValue(of(mockcandidatemappingdata))
     mockCandidatemappingService.DeleteCandidateMappingData.and.returnValue(of(mockcandidatemappingdata.soW_CandidateId))
     mockAccountserviceService.GetAllAccountData.and.returnValue(of(mockaccountdata))
     mockTechnologyService.GetAllTechData.and.returnValue(of(mocktechdata))
     mockRecruiterserviceService.GetAllRecruiterData.and.returnValue(of(mockrecdata))
     mockUstpocserviceService.GetAllUstPocData.and.returnValue(of(mocktpodata))
     mockDellmanagerserviceService.GetAllDellManagerData.and.returnValue(of(mockdellmanagerdata))
     mockStatusserviceService.GetAllStatusData.and.returnValue(of(mockstatusdata))
     mockRegionserviceService.GetAllRegionData.and.returnValue(of(mockregiondata))
     mockUsttpmserviceService.GetAllUSTTPMData.and.returnValue(of(mocktpmdata))
     mockLocationserviceService.GetAllLocationData.and.returnValue(of(mocklocationdata))
     mockCandidatemappingService.GetAllCandidateMappingData.and.returnValue(of(mockcandidatemappingdata))
     mockSOWService.DeleteSowData.and.returnValue(of(mocksowdata.sowId))
     mockSOWService.GetSOByDate.and.returnValue(of(mocksowdata))
     mockExcelService.jsonExportAsExcel.and.returnValue(of(mockexceldata))
     mockStatusserviceService.GetStatusByType.and.returnValue(of(mockstatusdata))
    fixture.detectChanges();
  });
  it('add',()=>{
    component.Add()
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('GetDropdown1',()=>{
    component.GetDropdown1()
    expect(component.GetDropdown1()).toBeTruthy()
  })
  it('GetDropdown2',()=>{
   
    component.GetDropdown2()
    expect(component.GetDropdown2()).toBeTruthy()
  })
  it('GetDropdown3',()=>{
   
    component.GetDropdown3()
    expect(component.GetDropdown3()).toBeTruthy()
  })
  it('GetDropdown4',()=>{
   
    component.GetDropdown4()
    expect(component.GetDropdown4()).toBeTruthy()
  })
  it('GetDropdown5',()=>{
   
    component.GetDropdown5()
    expect(component.GetDropdown5()).toBeTruthy()
  })
  
  it('GetDropdown6',()=>{
   
    component.GetDropdown6()
    expect(component.GetDropdown6()).toBeTruthy()
  })
  it('GetDropdown7',()=>{
   
    component.GetDropdown7()
    expect(component.GetDropdown7()).toBeTruthy()
  })
  it('GetDropdown8',()=>{
   
    component.GetDropdown8()
    expect(component.GetDropdown8()).toBeTruthy()
  })
  it('GetDropdown9',()=>{
   
    component.GetDropdown9()
    expect(component.GetDropdown9()).toBeTruthy()
  })
  it('GetDropdown10',()=>{
   
    component.GetDropdown10()
    expect(component.GetDropdown10()).toBeTruthy()
  })
  it('onEdit',()=>{
    component.onEdit()
    expect(component.onEdit())
  })
  it('onAdd',()=>{
    component.onAdd()
    expect(component.onAdd())
  })
 
  it('deleteDetails',()=>{
    spyOn(window,'confirm').and.returnValue(true)
    const data={
          sowId: 9,
            soName: "pra",
            jrCode: "1234",
            requestCreationDate: "2023-04-04T13:06:55.02",
            accountId: 4,
            technologyId: 180,
            role: "Developer",
            locationId: 3,
            regionId: 2,
            targetOpenPositions: 1,
            positionsTobeClosed: 1,
            ustpocId: 41,
            recruiterId: 28,
            usttpmId: 63,
            dellManagerId: 577,
            statusId: 2,
            band: "A",
            projectId: "123",
            accountManager: "mahesh",
            externalResource: "bhagya",
            internalResource: "bhagya",
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
        }
        component.deleteDetails(data.sowId)
        expect( component.deleteDetails(data.sowId)).toBe()
  })
  
  it('dataTrim',()=>{
    expect(component.dateTrim("2023/03/01")).toEqual("2023/03/01")
  })
  it('download',()=>{
    mockSOWService.GetSOByDate("2023/03/01","2023/04/01")
      component.download()
  })
  it('OnPreviousClicked',()=>{
    component.currentPage=2
    component.OnPreviousClicked()
    expect(component.currentPage).toEqual(1)
  })
  it('OnNextClicked',()=>{
    component.currentPage=2
    component.OnNextClicked()
    expect(component.currentPage).toEqual(3)
  })
  it('OnPageNumberChanged,pagenumber>=totalPages',()=>{
    const event={target:{value:6}}
    component.totalPages=3
    component.OnPageNumberChanged(event)
    expect(component.batchRecord.length).toEqual(5)
  })
  it('OnPageNumberChanged,pagenumber<totalPages',()=>{
    const event={target:{value:3}}
    component.totalPages=6
    component.OnPageNumberChanged(event)
    expect(component.batchRecord).toEqual([])
  })
  it('SetDefaultPagination',()=>{
    component.SetDefaultPagination()
  })
  it('setDefaultPaginationForcly',()=>{
    component.batchFilteredRecord=[1,2,3]
    component.pageSizeSelected=2;
    spyOn(component,'batchFilteredRecord').and.returnValue(component.batchFilteredRecord)
    component.SetDefaultPaginationForcly([1,2])
    expect(component.batchRecord.length).toBe(2)
    
  })
  it('onClick',()=>{
    component.isChecked=false
    component.onClick()
    expect( component.onClick())
  })
  it('searchFilter, search text is defined ', () => {
    const searchText = 'Declined';
    const data =    [{
      sowId: 9,
                soName: "pra",
                jrCode: "1234",
                requestCreationDate: "2023-04-04T13:06:55.02",
                accountId: 4,
                technologyId: 180,
                role: "Developer",
                locationId: 3,
                regionId: 2,
                targetOpenPositions: 1,
                positionsTobeClosed: 1,
                ustpocId: 41,
                recruiterId: 28,
                usttpmId: 63,
                dellManagerId: 577,
                statusId: 2,
                band: "A",
                projectId: "123",
                accountManager: "mahesh",
                externalResource: "bhagya",
                internalResource: "bhagya",
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
    }]
  
    component.SOData = data;
    component.searchText = searchText;
    component.searchFilter();
    expect(component.batchRecord.length).toBe(1);
   
  });
  
  it('searchFilter',()=>{
  
    component.searchText= ''
    spyOn(component,'SetDefaultPaginationForcly')
    component.searchFilter();
    expect(component.batchRecord.length).toEqual(5)
  })
it('OnPreviousReleased',()=>{
  spyOn(window,'clearInterval')
  component.OnPreviousReleased();
  expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
})
it('OnNextReleased',()=>{
  spyOn(window,'clearInterval')
  component.OnNextReleased();
  expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval)
})
it('OnPreviousHeld',()=>{
  component.currentPage=2
  spyOn(component,'OnPreviousClicked')
  component.OnPreviousHeld()
  jasmine.clock().install()
  jasmine.clock().tick(200)
  expect(component.OnPreviousHeld()).toBe()
  jasmine.clock().tick(200)
  expect(component.OnPreviousHeld()).toBe()
  jasmine.clock().uninstall()
})
it('OnPreviousHeld,currentPage=1',()=>{
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
it('OnNextHeld, should call OnNextClicked while currentPage < totalPages', () => {
  component.currentPage = 1;
  component.totalPages = 2;
  spyOn(component, 'OnNextClicked');
  component.OnNextHeld();
  jasmine.clock().install(); 
  jasmine.clock().tick(200); 
  expect(component.OnNextHeld()).toBe();
  jasmine.clock().tick(200);  
  expect(component.OnNextHeld()).toBe();
   jasmine.clock().uninstall(); 
});
it('OnNextHeld, should call OnNextClicked while currentPage >=totalPages', () => {
  component.currentPage = 5;
  component.totalPages = 2;
  spyOn(component, 'OnNextClicked');
  component.OnNextHeld();
  jasmine.clock().install(); 
  jasmine.clock().tick(200); 
  expect(component.OnNextHeld()).toBe();
  jasmine.clock().tick(200); 
  expect(component.OnNextHeld()).toBe();
  jasmine.clock().uninstall();  
});
it('f',()=>{
  expect(component.SowForm.controls).toEqual(component.f)
})
it('addfile', () => {
  const file = new File([''], 'so-details.xlsx');
  const event = { target: { files: [file] } };
  component.addfile(event);
  expect(component.file).toEqual(file);
});
it('addfile,alert',()=>{
  const file = new File([''], 'so-details.xlsx');
  const event = { target: { files: [file] } };
  mockSOWService.PostSOWDuplicateCheck.and.returnValue(of(mocksowdata))
  mockSOWService.GetAllSowData.and.returnValue(of(mocksowdata))
  component.addfile(event)
})
it('addfile,error',()=>{
  const file = new File([''], 'so-details.xlsx');
  const event = { target: { files: [file] } };
  mockSOWService.PostSOWDuplicateCheck.and.returnValue(of(mocksowdata))
  mockSOWService.GetAllSowData.and.returnValue(throwError(()=>{
    new Error("no file")
  }))
  component.addfile(event)
})
it('onSubmit',()=>{
  component.SowForm.patchValue({ soName: "",
  jrCode: "",
  requestCreationDate: "",
  accountId: "",
  technologyId: "",
  regionId: "",
  role: "",
  locationId: "",
  targetOpenPositions: "",
  positionsTobeClosed: "",
  ustpocId: "",
  recruiterId: "",
  usttpmId: "",
  dellManagerId: "",
  statusId: "",
  band: "",
  projectId: "",
  accountManager: "",
  externalResource: "",
  internalResource: "",
})
component.onSubmit()
  

})
it('onSubmit',()=>{
  component.SowForm.patchValue({ 
    soName: "pra",
  jrCode: "1234",
  requestCreationDate: "2023-04-04T13:06:55.02",
  accountId:"4",
  technologyId: "180",
  regionId: "2",
  role: "Developer",
  locationId: '3',
  targetOpenPositions: '1',
  positionsTobeClosed: '1',
  ustpocId: '41',
  recruiterId: '28',
  usttpmId: '63',
  dellManagerId: '577',
  statusId: '2',
  band: "A",
  projectId: "123",
  accountManager: "DL-MY",
  externalResource: "bhagya",
  internalResource: "bhagya",
})
spyOn(component,'onAdd')
component.editmode=false
component.onAdd()
component.onSubmit()
expect(component.onAdd()).toBe()
})
it('onSubmit',()=>{
  component.SowForm.patchValue({ 
    soName: "pra",
  jrCode: "1234",
  requestCreationDate: "2023-04-04T13:06:55.02",
  accountId:"4",
  technologyId: "180",
  regionId: "2",
  role: "Developer",
  locationId: '3',
  targetOpenPositions: '1',
  positionsTobeClosed: '1',
  ustpocId: '41',
  recruiterId: '28',
  usttpmId: '63',
  dellManagerId: '577',
  statusId: '2',
  band: "A",
  projectId: "123",
  accountManager: "DL-MY",
  externalResource: "bhagya",
  internalResource: "bhagya",
})
spyOn(component,'onEdit')
component.editmode=true
component.onEdit()
component.onSubmit()
expect(component.onEdit()).toBe()
})
it('getAccount', () => {
  component.accountList = [
    {
      "accountId": 5,
      "accountName": "DL_N",
      "type": ""
    }
  ];
  const id = 5;
  expect(component.getAccount(id)).toEqual('DL_N');
})
it('getTechnology', () => {
  component.technologyList = [
    {
      "technologyId": 187,
      "technologyName": "XQUERY Dev",
      "domainId": 11,
      "type": "",
      
      
    }
  ];
  const id = 187;
  expect(component.getTechnology(id)).toEqual('XQUERY Dev');
})
it('getLocation', () => {
  component.locationList = [
    {
      "locationId": 1,
      "location": "US",
      "regionId": 4,
      "type": ""
    }
  ];
  const id = 1;
  expect(component.getLocation(id)).toEqual('US');
})
it('getRegion',()=>{
  component.regionList=[
    {
      "regionId": 1,
      "region": "IN",
      "type": ""
    }
  ]
  const id=1
  expect(component.getRegion(id)).toEqual("IN")
})
it('getUSTPOC',()=>{
  component.ustPocList=[
    {
      "ustpocId": 42,
      "ustpocName": "Rakshitha B / MoonRaft",
      "type": ""
    },
    
  ]
  const id=42
  expect(component.getUSTPOC(id)).toEqual("Rakshitha B / MoonRaft")
})
it('getUSTTPM',()=>{
  component.ustTpmList=[ 
    {
      "usttpmId": 68,
      "usttpmName": "Chand Shaik",
      "type": ""
    }
  ]
  const id=68
  expect(component.getUSTTPM(id)).toEqual("Chand Shaik")
})
it('getDellManager',()=>{
  component.dellManagerList=[
    {
      "dellManagerId": 587,
      "dellManagerName": "Viswa k",
      "type": ""
    }
  ]
 const id=587
  expect(component.getDellManager(id)).toEqual("Viswa k")
})
it('getStatus',()=>{
  component.statusList=[
    {
      "statusId": 6,
      "statusName": "Rejected",
      "type": "",
      "statusType":"Candidate"
    }  
  ]
  const id=6
  expect(component.getStatus(id)).toEqual("Rejected")
})
it('getRecruiter',()=>{
  component.recruiterList=[ 
    {
      "recruiterId": 27,
      "recruiterName": "Srinivas",
      "type": ""
    }
  ]
  const id=27
  expect(component.getRecruiter(id)).toEqual("Srinivas")
})
it('editdetails',()=>{
  const data={
    sowId: 9,
      soName: "pra",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId: 4,
      technologyId: 180,
      role: "Developer",
      locationId: 3,
      regionId: 2,
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: 41,
      recruiterId: 28,
      usttpmId: 63,
      dellManagerId: 577,
      statusId: 2,
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
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
  }
  component.editDetails(data)
})
it('GetSODetails',()=>{
  const account=spyOn(component,'getAccount').and.returnValue(4)
  
  const data={
    sowId: 9,
      soName: "pra",
      jrCode: "1234",
      requestCreationDate: "2023-04-04T13:06:55.02",
      accountId:account,
      technologyId:spyOn(component,'getTechnology').and.returnValue(180),
      role: "Developer",
      locationId: spyOn(component,'getLocation').and.returnValue(3),
      regionId: spyOn(component,'getRegion').and.returnValue(2),
      targetOpenPositions: 1,
      positionsTobeClosed: 1,
      ustpocId: spyOn(component,'getUSTPOC').and.returnValue(41),
      recruiterId: spyOn(component,'getRecruiter').and.returnValue(28),
      usttpmId: spyOn(component,'getUSTTPM').and.returnValue(63),
      dellManagerId: spyOn(component,'getDellManager').and.returnValue(577),
      statusId: spyOn(component,'getStatus').and.returnValue(2),
      band: "A",
      projectId: "123",
      accountManager: "mahesh",
      externalResource: "bhagya",
      internalResource: "bhagya",
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
  }
  
  component.GetSODetails()
})
it('onEdit',()=>{
  mockSOWService.UpdateSowData.and.returnValue(throwError(()=>{
    new Error("Data not updated")
  }))
  component.onEdit()
})
it('GetSowData',()=>{
  mockSOWService.GetAllSowData.and.returnValue(throwError(()=>{
    new Error("No So Data")

  }))
  component.GetSowData()
})
});
