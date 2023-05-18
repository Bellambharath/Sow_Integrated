import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CommonService } from '../common.service';
import { BehaviorSubject, of } from 'rxjs';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockCommonService,mockcommondata,mockRenderer2,mockElementRef,mocklocation
  beforeEach(async () => {
     mockCommonService=jasmine.createSpyObj('CommonService',['loadComponent','headerContent'])
     mockElementRef=jasmine.createSpyObj('ElementRef',['nativeElement','querySelector'])
     mockCommonService.HeaderContent = new BehaviorSubject<boolean>(true);
     mockCommonService.loadMessage = new BehaviorSubject<boolean>(true);
     mocklocation=jasmine.createSpyObj('Location',['location','reload'])
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers:[{provide:CommonService,useValue:mockCommonService},{provide:Renderer2,useValue:mockRenderer2},
      {provide:ElementRef,useValue:mockElementRef},{provide:Location,useValue:mocklocation}]
    })
    .compileComponents();
  
    let mockuserData={
      "LoginName": "Admin",
      "EmailId": "admin@gmail.com",
      "RoleName": "Admin",
      "ScreenNames": "CandidateDetails,SOW,Domain,Technology,Mapping,SoList,CandidateList,Registration,ChangePassword",
      "Status": "1",
      "PermissionName": "Edit",
      "FailureAttempts": 0,
      "Islock": false
    }
    sessionStorage.setItem('userData',JSON.stringify(mockuserData))
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("HeaderContent",()=>{
    spyOn(component.eventChange, 'emit');
    mockCommonService.HeaderContent.next(false);
    expect(component.isChecked).toBeFalse();
    expect(component.eventChange.emit).toHaveBeenCalledWith(component.isChecked);
  })
  it('MenuClose',()=>{
    component.MenuClose()
  })
 
  it('update',()=>{
    component.update()
    expect(component.isChecked).toBeTrue();
  })
   it('logOut',()=>{
   
   component.header = false;
   component.setAllDefaults();
   spyOn(sessionStorage, 'clear');
  
   component.logOut();
  
   })
  
  it('managePassword',()=>{
    component.managePassword()
  
  })
  it('setAllDefaults',()=>{
    component.sow=false
    component.candidatedetails=false
    component.mapping=false
    component.domain=false
    component.technology=false
    component.login=false
    component.dashboard=false
    component.registration=false
    component.ChangePW=false
    component.setAllDefaults()
  })
  it('closeMenuBox',()=>{
    component.closeMenuBox()
    expect(component.isChecked).toBeFalse()
  })
  it('handleClick',()=>{
   
    component.handleClick()
  })
  it('managePassword1',()=>{
    component.managePassword1()
  })
  it('toggleMore',()=>{
     component.toggleMore()
  })
  // it('should set the toggle values based on ScreenNames', () => {
  
  //   const ScreenNames = ['sow', 'candidatedetails', 'mapping', 'domain', 'technology', 'registration'];
  // const expectedToggle = {
  //   sow: true,
  //   candidatedetails: true,
  //   mapping: true,
  //   domain: true,
  //   technology: true,
  //   registration: true,
  //   ChangePassword: component.ChangePW
  // };
  //   spyOn(sessionStorage, 'setItem');
  //   component.loggedIn(); 
  // });
  
  
  
});
