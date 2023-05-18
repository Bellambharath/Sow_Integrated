import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegistrationService } from '../services/registration.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let mockRegistrationService, mockExcelService, mockLoginService,
    mockregdata, mockexceldata, mocklogindata, mockreglogindata
  beforeEach(async () => {
    mockRegistrationService = jasmine.createSpyObj('RegistrationService', ['GetRoleData', 'PostRegistrationData', 'GetLoginData',
      'UpdateLoginData', 'DeleteLoginData'])
    mockExcelService = jasmine.createSpyObj('ExcelService', ['jsonExportAsExcel'])
    mockLoginService = jasmine.createSpyObj('LoginService', ['GetUserData', 'PutUserData', 'GetLoginData'])
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      providers: [{ provide: RegistrationService, useValue: mockRegistrationService }, { provide: ExcelService, useValue: mockExcelService },
      { provide: LoginService, useValue: mockLoginService }]
    })
      .compileComponents();
    mockregdata = [
      {
        "loginName": "",
        "loginPassword": "",
        "loginId": 0,
        "emailId": "",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      }
    ]
    mockreglogindata = [
      {
        "loginName": "Admin",
        "loginPassword": "",
        "loginId": 1,
        "emailId": "admin@gmail.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Bhagya",
        "loginPassword": "",
        "loginId": 2,
        "emailId": "bhagya@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Deepika",
        "loginPassword": "",
        "loginId": 13,
        "emailId": "deepika@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Chaithra",
        "loginPassword": "",
        "loginId": 14,
        "emailId": "chaithra@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      }]
    mockexceldata = [{ "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support" }, { "domainId": 8, "domainName": "R&D" }]
    mocklogindata = [
      {
        "loginName": "Admin",
        "loginPassword": "",
        "loginId": 1,
        "emailId": "admin@gmail.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Bhagya",
        "loginPassword": "",
        "loginId": 2,
        "emailId": "bhagya@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Deepika",
        "loginPassword": "",
        "loginId": 13,
        "emailId": "deepika@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      },
      {
        "loginName": "Chaithra",
        "loginPassword": "",
        "loginId": 14,
        "emailId": "chaithra@ust.com",
        "roleId": 1,
        "roleName": "Admin",
        "type": "",
        "failureAttempts": 0,
        "isLock": false
      }]
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    mockRegistrationService.GetLoginData.and.returnValue(of(mockreglogindata))
    mockRegistrationService.GetRoleData.and.returnValue(of(mockregdata))
    mockRegistrationService.UpdateLoginData.and.returnValue(of(mockregdata))
    mockRegistrationService.PostRegistrationData.and.returnValue(of(mockregdata))
    mockRegistrationService.DeleteLoginData.and.returnValue(of(mockregdata))
    mockExcelService.jsonExportAsExcel.and.returnValue(of(mockexceldata))
    mockLoginService.PutUserData.and.returnValue(of(mocklogindata))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('onSubmit', () => {
    component.submitted = true
    component.regForm.patchValue({
      userName: "",
      emailId: "",
      role: ""
    })
    component.onSubmit()
  })
  it('onSubmit,should call onEdit', () => {
    component.submitted = true
    component.regForm.patchValue({

      userName: "Admin",
      emailId: "admin@gmail.com",
      role: "1"
    })
    component.editMode = true
    spyOn(component, 'isDuplicate').and.returnValue(false)
    spyOn(component, 'onEdit')
    component.onEdit()
    component.onSubmit()
    expect(component.onEdit).toHaveBeenCalled()
  })
  it('onSubmit,should call onAdd', () => {
    component.submitted = true
    component.regForm.patchValue({

      userName: "Admin",
      emailId: "admin@gmailcom",
      role: "1"
    })
    component.editMode = false
    spyOn(component, 'isDuplicate').and.returnValue(false)
    spyOn(component, 'onAdd')
    component.onAdd()
    component.onSubmit()
    expect(component.onAdd).toHaveBeenCalled()
  })
  it('onEdit', () => {
    component.onEdit()
  })
  it('onAdd', () => {
    component.onAdd()
  })
  it('editDetails', () => {
    const data = {
      loginName: "Bhagya",
      loginPassword: "",
      loginId: 2,
      emailId: "bhagya@ust.com",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
    component.editDetails(data)
  })
  it('deleteDetails', () => {
    spyOn(window,'confirm').and.returnValue(true)
    const data = {
      loginName: "Bhagya",
      loginPassword: "",
      loginId: 2,
      emailId: "bhagya@ust.com",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
    component.deleteDetails(data)
  })
  it('download', () => {
    component.download()
  })
  it('OnNextHeld,currentPage < totalPages', () => {
    component.totalPages = 4
    component.currentPage = 2
    spyOn(component, 'OnNextClicked')
    component.OnNextHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toEqual()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toEqual()
    jasmine.clock().uninstall()
  })
  it('OnNextHeld,currentPage > totalPages', () => {
    component.totalPages = 1
    component.currentPage = 2
    spyOn(component, 'OnNextClicked')
    component.OnNextHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toEqual()
    jasmine.clock().tick(200)
    expect(component.OnNextHeld()).toEqual()
    jasmine.clock().uninstall()
  })
  it('OnNextReleased', () => {
    spyOn(window, 'clearInterval')
    component.OnNextReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval)
  })
  it('OnPreviousHeld,currentPage greater than 1', () => {
    component.currentPage = 2
    spyOn(component, 'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toEqual()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toEqual()
    jasmine.clock().uninstall()
  })
  it('OnPreviousHeld,currentPage less than or equal to  1', () => {
    component.currentPage = 0
    spyOn(component, 'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toEqual()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toEqual()
    jasmine.clock().uninstall()
  })
  it('OnPreviousReleased', () => {
    spyOn(window, 'clearInterval')
    component.OnPreviousReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
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
  it('searchFilter, search text is defined ', () => {
    const searchText = 'Bhagya';
    const data = [{
      loginName: "Bhagya",
      loginPassword: "",
      loginId: 2,
      emailId: "bhagya@ust.com",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false

    }];
    component.loginData = data;
    component.searchText = searchText;
    component.searchFilter();
    expect(component.batchRecord.length).toBe(1);

  });
  // it('searchFilter', () => {

  //   const searchText=undefined
  //   component.searchText = searchText;
  //   component.searchFilter();
  // })

  it('searchFilter', () => {

    component.searchText = ''
    spyOn(component, 'SetDefaultPaginationForcly')
    component.searchFilter();
    expect(component.batchRecord.length).toEqual(4)
  })
  it('OnPreviousClicked', () => {
    component.currentPage = 2
    component.OnPreviousClicked()
    expect(component.currentPage).toEqual(1)
  })
  it('OnNextClicked', () => {
    component.currentPage = 2
    component.OnNextClicked()
    expect(component.currentPage).toEqual(3)
  })
  it('lockAccount', () => {
    component.lock = false
    component.lockAccount()
  })
  it('resetAccount', () => {
    component.resetAccount()
  })
  it('isDuplicate', () => {
    const checkDuplicate = true
    const checkDuplicateEmail = false
    component.regForm.patchValue({
      userName: "",
      emailId: "",
      role: "",
    })
    component.isDuplicate(false)
    expect(component.isDuplicate(false)).toEqual(false)
  })

  // it('isDuplicate, should be isEdit', () => {
  //   component.prevUserName = 'Bhagya'
  //   component.regForm.patchValue({
  //     userName: "Bhagya ",
  //     emailId: "bhagya@ust.com",
  //     role: "1"
  //   });
  //   spyOn(component, 'isDuplicate').and.callThrough();
  //   expect(component.isDuplicate(true)).toBe(false);
  // });

  it('isDuplicate, Email Should different', () => {
    component.prevEmailId = 'Bhagya123@gmail.com'
    let data = {
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.editDetails(data);
    component.regForm.patchValue({
      userName: "Bhagya",
      emailId: "bhagya123@ust.com",
      role: "1",
    });
    component.isDuplicate(true);
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(false);

  });

  it('isDuplicate, Username shouldnot same and username is alredyexist', () => {

    let data = {
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.editDetails(data);
    component.regForm.patchValue({
      userName: 'deepika',
      emailId: "bhagya123@ust.com",
      role: "1",
    });
    component.loginData = mocklogindata;
    component.isDuplicate(true);
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(true);

  });
  it('isDuplicate, Username & Email shouldnot same and username is unique Email should alredy exist', () => {

    let data = {
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.editDetails(data);
    component.regForm.patchValue({
      userName: 'Bhagyalaxmi',
      emailId: "deepika@ust.com",
      role: "1",
    });
    component.loginData = mocklogindata;
    component.isDuplicate(true);
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(true);

  });

  it('isDuplicate, Username should same and Email shouldnot same & Email is unique', () => {

    let data = {
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.editDetails(data);
    component.regForm.patchValue({
      userName: 'Bhagya',
      emailId: "deepika@ust.com",
      role: "1",
    });
    component.loginData = mocklogindata;
    component.isDuplicate(true);
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(true);

  });

  it('onEdit, Should edit details', () => {
    let data = {
      loginId: 2,
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.id = 2;
    component.regForm.patchValue({

      userName: 'Bhagyalaxmi',
      emailId: "bhagyalaxmi@ust.com",
      role: "1",
    });
    component.onEdit();

    expect(mockRegistrationService.UpdateLoginData).toHaveBeenCalled();


  });
  it('onEdit, Should throw error', () => {
    let data = {
      loginId: 2,
      loginName: 'Bhagya',
      emailId: 'bhagya@ust.com',
      roleId: '1'
    };
    component.id = 0;
    component.regForm.patchValue({

      userName: 'Bhagyalaxmi',
      emailId: "bhagyalaxmi@ust.com",
      role: "1",
    });
    const errorMessage = 'Error message from server';
    mockRegistrationService.UpdateLoginData.and.returnValue(throwError(new HttpErrorResponse({ status: 500, error: errorMessage })));
    component.onEdit();

    expect(mockRegistrationService.UpdateLoginData).toHaveBeenCalled();
  });

  it('deleteDetails,Shouldnot delete', () => {
    const data = {
      loginName: "Bhagya",
      loginPassword: "",
      loginId: 2,
      emailId: "bhagya@ust.com",
      roleId: 1,
      roleName: "Admin",
      type: "",
      failureAttempts: 0,
      isLock: false
    }
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteDetails(data);
  })
  it('getLoginData,should throw error', () => {
    spyOn(console, 'log');
    mockRegistrationService.GetLoginData.and.returnValue(throwError('Error'));

    component.getLoginData();

    expect(mockRegistrationService.GetLoginData).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Error');
  });
  it('isFieldInvalid',()=>{
    const fieldName='R&D'
    const control={invalid:true,touched:true}
    spyOn(component.regForm,'get').and.returnValue(control as AbstractControl)
    expect(component.isFieldInvalid(fieldName)).toBe(true)
  })
  
});
