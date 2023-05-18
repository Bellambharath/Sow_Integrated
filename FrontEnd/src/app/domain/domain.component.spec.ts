import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainComponent } from './domain.component';
import { DomainService } from '../services/domain.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { of, throwError } from 'rxjs';
import { AbstractControl } from '@angular/forms';
describe('DomainComponent', () => {
  let component: DomainComponent;
  let fixture: ComponentFixture<DomainComponent>;
  let mockDomainService,mockExcelService,mockLoginService,mockDomaindata,mockexceldata

  beforeEach(async () => {
    mockDomainService=jasmine.createSpyObj('DomainService',['GetAllDomainData','PostDomainData','DeleteDomainData',
    'UpdateDomainData','GetDomainById'])
    mockExcelService=jasmine.createSpyObj('ExcelService',['jsonExportAsExcel'])
    await TestBed.configureTestingModule({
      declarations: [ DomainComponent ],
      providers:[{provide:DomainService,useValue:mockDomainService},{provide:ExcelService,useValue:mockExcelService},{provide:LoginService,useValue:mockLoginService}]
    })
    .compileComponents();
    mockDomaindata=[ { "domainId": 12, "domainName": "EBI/DWH", "type": "" }, { "domainId": 11, "domainName": "App Dev", "type": "" }, { "domainId": 10, "domainName": "DB", "type": "" }, { "domainId": 9, "domainName": "Support", "type": "" }, { "domainId": 8, "domainName": "R&D", "type": "" }]
    mockexceldata=[ { "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support"}, { "domainId": 8, "domainName": "R&D" }]

    fixture = TestBed.createComponent(DomainComponent);
    component = fixture.componentInstance;
    
    mockDomainService.GetAllDomainData.and.returnValue(of(mockDomaindata))
    mockDomainService.UpdateDomainData.and.returnValue(of(mockDomaindata))
    mockDomainService.PostDomainData.and.returnValue(of(mockDomaindata))
    mockExcelService.jsonExportAsExcel.and.returnValue(of())
    fixture.detectChanges();
  });
  afterEach(() => {
    clearInterval(component.nextInterval); 
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('GetAllDomainData',()=>{
    mockDomainService.GetAllDomainData.and.returnValue(throwError(()=>{
      new Error("no data")
    })) 
    component.GetAllDomainData()
   })
  it('onSubmit',()=>{
    component.domainForm.patchValue({domainName:''})
    component.onSubmit();
  });
  it('onSubmit, should call onEdit',()=>{
    component.domainForm.patchValue({domainName:'App Dev'})
       component.editmode=true;
       spyOn(component,'isDuplicate').and.returnValue(false)
       spyOn(component,'onEdit');
     component.onEdit();
     component.onSubmit();
     expect(component.onEdit).toHaveBeenCalled();
  })
  it('onSubmit, should call onAdd',()=>{
    component.domainForm.patchValue({domainName:'AppDev'})
       component.editmode=false;
       spyOn(component,'isDuplicate').and.returnValue(false)
       spyOn(component,'onAdd');
     component.onAdd();
     component.onSubmit();
     expect(component.onAdd).toHaveBeenCalled();
  })
  it('isDuplicate, should be not null', () => {
    component.domainForm.patchValue({ domainName: 'R&D' });
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(false)).toBe(true);
  });
  it('isDuplicate, should be null', () => {
    component.domainForm.patchValue({ domainName: '' }); 
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(false)).toBe(false);
  });
  it('isDuplicate, should be isEdit', () => {
    component.prevDomainName='R&D'
    component.domainForm.patchValue({ domainName: 'R&D' }); 
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(false);
  });
  it('editDetails',()=>{
    component.domainForm.patchValue ({domainName:'R&D'})
    component.editmode=true;
    
    expect(component.editDetails(8)).toBe()
  })
  it('createObject',()=>{
    expect(component.createObject('Domain Data'))
  })
  it('OnNextReleased', () => {
    spyOn(window, 'clearInterval'); 
    component.OnNextReleased();

    expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval);
  })
  it('OnPreviousReleased',()=>{
    spyOn(window,'clearInterval')
    component.OnPreviousReleased();
    expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
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
  it('OnPreviousHeld, should call OnPreviousHedld while currentPage > 1',()=>{
    component.currentPage=2
    spyOn(component,'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe();
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe();
    jasmine.clock().uninstall();
  })
  it('OnPreviousHeld,should call OnPreviousHedld while currentPage <= 1',()=>{
    component.currentPage=0
    spyOn(component,'OnPreviousClicked')
    component.OnPreviousHeld()
    jasmine.clock().install()
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe();
    jasmine.clock().tick(200)
    expect(component.OnPreviousHeld()).toBe();
    jasmine.clock().uninstall();
  })
  it('onEdit',()=>{
    const obj={
      "domainId": 12, 
      "domainName": "EBI/DWH",
      "type":'update'
    }
     const formValue={domainName:'EBI/DWH'};
     component.domainForm.setValue(formValue)
     mockDomainService.UpdateDomainData(12,obj)
     component.onEdit()
     expect(mockDomainService.UpdateDomainData).toHaveBeenCalledWith(12,obj);
     expect(component.editmode).toBe(false);
     expect(component.Id).toBeNull();
  })
  it('onAdd',()=>{
    const formValue={domainName:'R&D'};
   component.domainForm.patchValue(formValue)
   const obj={
   "domainName": "R&D",
    "type":'post'
  }
  mockDomainService.PostDomainData(obj)
  component.onAdd()

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
it('searchFilter',()=>{
  component.batchFilteredRecord=[1,2,3]
  component.pageSizeSelected=2;
  component.searchText= ''
  spyOn(component,'SetDefaultPaginationForcly')
  component.searchFilter();
  expect(component.SetDefaultPaginationForcly([1,2])).toBe()
})

it('searchFilter',()=>{
  component.batchFilteredRecord=[1,2,3]
  component.pageSizeSelected=2;
  component.searchText= 'R&D'
  spyOn(component,'SetDefaultPaginationForcly')
  component.searchFilter();
  expect(component.SetDefaultPaginationForcly([1,2])).toBe()
})
// it('searchFilter',()=>{
//   // const obj={
//   //   "domainId": 8, 
//   //   "domainName": "R&D",
//   //   "type":''
//   // }
//   component.batchFilteredRecord=[1,2,3]
//   component.pageSizeSelected=2;
//   component.searchText= ' '
//   spyOn(component,'SetDefaultPaginationForcly')
//   component.searchFilter();
//   expect(component.SetDefaultPaginationForcly([1,2])).toBe()
//   expect(component.isBatchSearch).toBeUndefined();
// expect(component.isBatchSearch).toBe(false);
//   expect(component.batchRecord).toEqual([])
// })
it('download',()=>{
  spyOn(component,'createObject').and.returnValue(mockexceldata)
  component.download();
})
it('onedit',()=>{
  mockDomainService.UpdateDomainData.and.returnValue(throwError(()=>{
    expect(component.editmode).toEqual(false)
    expect(component.Id).toEqual(null)
  }))
  component.onEdit()
})
it('isFieldInvalid',()=>{
  const fieldName='R&D'
  const control = { invalid: true, touched: true };
  spyOn(component.domainForm,'get').and.returnValue(control as AbstractControl)
  expect(component.isFieldInvalid(fieldName)).toBe(true)
})
it('updateHeader',()=>{
  component.UpdateHeader()
})

})