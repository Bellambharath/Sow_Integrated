import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockDashboardService, mockdashboarddata,mockuserData
  beforeEach(async () => {
    mockDashboardService = jasmine.createSpyObj('DashboardService', ['GetSODashboardData', 'GetCandidateDashboardData'])
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: DashboardService, useValue: mockDashboardService }]

    })
      .compileComponents();
    mockdashboarddata = [
      {
        "category": "Status",
        "name": "Cancelled",
        "count": 0
      },
      {
        "category": "Status",
        "name": "Closed",
        "count": 0
      },
      {
        "category": "Status",
        "name": "Declined",
        "count": 0
      },
      {
        "category": "Status",
        "name": "Joined",
        "count": 0
      },
      {
        "category": "Status",
        "name": "Offered",
        "count": 0
      }];
    mockuserData = {
      "LoginName": "Admin",
      "EmailId": "admin@gmail.com",
      "RoleName": "Admin",
      "ScreenNames": "CandidateDetails,SOW,Domain,Technology,Mapping,SoList,CandidateList,Registration,ChangePassword",
      "Status": "1",
      "PermissionName": "Edit",
      "FailureAttempts": 0,
      "Islock": false
    };
   
    sessionStorage.setItem("userData", JSON.stringify(mockuserData));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    mockDashboardService.GetSODashboardData.and.returnValue(of(mockdashboarddata))
    mockDashboardService.GetCandidateDashboardData.and.returnValue(of(mockdashboarddata))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('getCandidateDashboardData', () => {
    component.getCandidateDashboardData()
    expect(component.getCandidateDashboardData()).toBe()
  })
  it('onSelected', () => {
    component.selectedTeam = "hi"
    component.onSelected(component.selectedTeam)
    expect( component.onSelected(component.selectedTeam)).toBe()
  })

  it('onSelectedChange', () => {
    component.selectperiod = "weekly"
    component.onSelectionChange(component.selectperiod);
    expect(component.onSelectionChange(component.selectperiod)).toBe()

  })
  it('onTabClick', () => {
    component.activeTab = "hi"
    component.onTabClick(component.activeTab)
    expect( component.onTabClick(component.activeTab)).toBe()
    })
});
