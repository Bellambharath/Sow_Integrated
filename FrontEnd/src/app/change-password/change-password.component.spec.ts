import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from '../services/change-password.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockChangePasswordService,mockRouter;
  beforeEach(async () => {
    mockChangePasswordService=jasmine.createSpyObj('ChangePasswordService',['UpdatePasswordData'])
    mockRouter=jasmine.createSpyObj('Router',['navigate'])
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers:[{provide:ChangePasswordService,useValue:mockChangePasswordService},{provide:Router,useValue:mockRouter}]
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
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isFieldInvalid', () => {
    const fieldName = 'email'; // Replace with the actual field name
    const control = { invalid: true, touched: true };
    spyOn(component.passwordForm, 'get').and.returnValue(control as AbstractControl);
    expect(component.isFieldInvalid(fieldName)).toBe(true);
  });
  it('get f',()=>{
    expect(component.passwordForm.controls).toEqual(component.f)
  })
  it('onSubmit',()=>{
    component.passwordForm.patchValue({
      oldPw:"" ,
    newPw:"" ,
    confirmPw:"",
    userName:""
    })
    component.onSubmit();
    
  })
  it('onSubmit,should call onAdd',()=>{
    component.passwordForm.patchValue({
      oldPw:"Sow@123" ,
    newPw:"Abc@123" ,
    confirmPw:"Abc@123",
    userName:"Bharath"
    })
    spyOn(component,'onAdd')
    component.onAdd()
    component.onSubmit()
    expect(component.onAdd()).toBe()
  })
  it('onAdd , passwordsMatch is false',()=>{
    component.passwordsMatch=false
    component.onAdd()
    expect(component.passwordMatchError).toEqual(" **Confirm Password does not match with the New Password")
  })
  it('onAdd,oldPasswordMatchWithNew is false',()=>{
    component.oldPasswordMatchWithNew=false
    component.onAdd()
    expect(component.oldPasswordMatchWithNewError).toEqual("**Old Password and New Password should not be the same")
  })
  it('onAdd,count2==2',()=>{
  
   mockChangePasswordService.UpdatePasswordData.and.returnValue(of({ count2: 2 }))
   component.passwordForm.setValue({
    oldPw: 'Sow@123',
    newPw: 'Abc@123',
    confirmPw: 'Abc@123',
    userName: 'Bharath'
  });

  component.onAdd();
  
    expect(mockChangePasswordService.UpdatePasswordData).toHaveBeenCalledWith({
      emailId: 'Bharath',
      oldPassword: 'Sow@123',
      newPassword: 'Abc@123',
      type: 'post'
    });

  })
  it('onAdd,count1==1',()=>{
  
    mockChangePasswordService.UpdatePasswordData.and.returnValue(of({ count1: 1 }))
    component.passwordForm.setValue({
     oldPw: 'Sow@123',
     newPw: 'Abc@123',
     confirmPw: 'Abc@123',
     userName: 'Bharath'
   });
      component.onAdd();
      expect(mockChangePasswordService.UpdatePasswordData).toHaveBeenCalledWith({
        emailId: 'Bharath',
        oldPassword: 'Sow@123',
        newPassword: 'Abc@123',
        type: 'post'
      });
  
   
    })
  it('onAdd',()=>{
    mockChangePasswordService.UpdatePasswordData.and.returnValue(throwError(()=>{
      new Error('Invalid Credentials')
    }))
    component.onAdd()
    expect(component.errorMessage).toEqual("Invalid Credentials")
  })
 
});
