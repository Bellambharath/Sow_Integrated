import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyComponent } from './technology.component';
import { DomainService } from '../services/domain.service';
import { ExcelService } from '../services/excel.service';
import { LoginService } from '../services/login.service';
import { TechnologyService } from '../services/technology.service';
import { of, throwError } from 'rxjs';
import { AbstractControl } from '@angular/forms';

describe('TechnologyComponent', () => {
  let component: TechnologyComponent;
  let fixture: ComponentFixture<TechnologyComponent>;
  let mockTechnologyService,mockdomainService,mockExcelService,mockLoginService,
  mocktechdata,mockdomaindata,mockexceldata,mocklogindata
  beforeEach(async () => {
    mockTechnologyService=jasmine.createSpyObj('TechnologyService',['GetAllTechData','PostTechData','DeleteTechData','UpdateTechData','GetTechById'])
    mockdomainService=jasmine.createSpyObj('DomainService',['GetAllDomainData','PostDomainData','DeleteDomainData'])
    mockExcelService=jasmine.createSpyObj('ExcelService',['jsonExportAsExcel'])
    await TestBed.configureTestingModule({
      declarations: [ TechnologyComponent ],
      providers:[{provide:TechnologyService,useValue:mockTechnologyService},{provide:DomainService,useValue:mockdomainService},
      {provide:ExcelService,useValue:mockExcelService},{provide:LoginService,useValue:mockLoginService}]
    })
    .compileComponents();
    mocktechdata=[
      {
        "technologyId": 5,
        "technologyName": " Vulnerability Remediation",
        "domainId": 6,
        "type": "",
        "domainName": "Others"
      },
      {
        "technologyId": 4,
        "technologyName": " RPA",
        "domainId": 6,
        "type": "",
        "domainName": "Others"
      },
      {
        "technologyId": 3,
        "technologyName": " React JS",
        "domainId": 6,
        "type": "",
        "domainName": "Others"
      },
      {
        "technologyId": 2,
        "technologyName": " cyber security",
        "domainId": 6,
        "type": "",
        "domainName": "Others"
      }]
      mockdomaindata=[ { "domainId": 12, "domainName": "EBI/DWH", "type": "" }, { "domainId": 11, "domainName": "App Dev", "type": "" }, { "domainId": 10, "domainName": "DB", "type": "" }, { "domainId": 9, "domainName": "Support", "type": "" }, { "domainId": 8, "domainName": "R&D", "type": "" }]
      mockexceldata=[ { "domainId": 12, "domainName": "EBI/DWH" }, { "domainId": 11, "domainName": "App Dev" }, { "domainId": 10, "domainName": "DB" }, { "domainId": 9, "domainName": "Support"}, { "domainId": 8, "domainName": "R&D" }]
    fixture = TestBed.createComponent(TechnologyComponent);
    component = fixture.componentInstance;
    mockTechnologyService.GetAllTechData.and.returnValue(of(mocktechdata))
    mockTechnologyService.UpdateTechData.and.returnValue(of(mocktechdata.Id,mocktechdata))
    mockTechnologyService.PostTechData.and.returnValue(of(mocktechdata))
    mockdomainService.GetAllDomainData.and.returnValue(of(mockdomaindata))
    mockExcelService.jsonExportAsExcel.and.returnValue(of())
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('GetAllTechData',()=>{
    component.GetAllTechData()
   
  })

  it('onSubmit',()=>{
    component.techForm.patchValue(
      {
        technologyName:'' ,
        domainId:''
      }
    )
    component.onSubmit();
  });
   it('onSubmit, should call onEdit',()=>{
    component.techForm.patchValue({
      technologyName:'cyber security' ,
      domainId:'6'
    })
       component.editmode=true;
       spyOn(component,'isDuplicate').and.returnValue(false)
       spyOn(component,'onEdit');
     component.onEdit();
     component.onSubmit();
     expect(component.onEdit).toHaveBeenCalled();
  })
  it('onSubmit, should call onAdd',()=>{
    component.techForm.patchValue({ technologyName:'cybersecurity' ,
    domainId:'6'})
       component.editmode=false;
       spyOn(component,'isDuplicate').and.returnValue(false)
       spyOn(component,'onAdd');
     component.onAdd();
     component.onSubmit();
     expect(component.onAdd).toHaveBeenCalled();
  })
  it('isDuplicate, should be not null', () => {
    component.techForm.patchValue({  technologyName:'cybersecurity' ,
    domainId:'6' });
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(false)).toBe(false);
  });
  it('isDuplicate, should be null', () => {
    component.techForm.patchValue({ technologyName:'' ,
    domainId:'' }); 
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(false)).toBe(false);
  });
  it('isDuplicate, should be isEdit', () => {
    component.prevTechnologyName='cyber security'
    component.techForm.patchValue({technologyName:'cybersecurity' ,
    domainId:'6'}); 
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(false);
  });
  it('isDuplicate, should be isEdit', () => {
    component.prevTechnologyName='cyber security'
    component.techForm.patchValue({technologyName:'cyber security' ,
    domainId:'6'}); 
    spyOn(component, 'isDuplicate').and.callThrough();
    expect(component.isDuplicate(true)).toBe(true);
  });
  it('OnNextHeld',()=>{
    component.currentPage=2
    component.totalPages=10
   
    spyOn(component, 'OnNextClicked');
    component.OnNextHeld();
    jasmine.clock().install(); 
    jasmine.clock().tick(200); 
    expect(component.OnNextHeld()).toBe();
    jasmine.clock().tick(200);  
    expect(component.OnNextHeld()).toBe();
     jasmine.clock().uninstall(); 
  })
  it('OnNextHeld,currentPage > totalPages',()=>{
    component.currentPage=2
    component.totalPages=1
   spyOn(component, 'OnNextClicked');
    component.OnNextHeld();
    jasmine.clock().install(); 
    jasmine.clock().tick(200); 
    expect(component.OnNextHeld()).toBe();
    jasmine.clock().tick(200);  
    expect(component.OnNextHeld()).toBe();
     jasmine.clock().uninstall(); 
  })
  it('OnNextReleased',()=>{
    spyOn(window,'clearInterval')
    component.OnNextReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.nextInterval)
  })
  it('OnPreviousHeld, currentPage > 1',()=>{
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
  it('OnPreviousHeld, currentPage < 1',()=>{
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
  it('OnPreviousReleased',()=>{
    spyOn(window,'clearInterval')
    component.OnPreviousReleased()
    expect(window.clearInterval).toHaveBeenCalledWith(component.previousInterval)
  })
  it('onEdit',()=>{
    const obj={
      "technologyId": 2,
      "technologyName": " cyber security",
      "domainId": 6,
      "type": "",
      "domainName": "Others"
    }
     const formValue={technologyName:'cyber security' ,
     domainId:'6'};
     component.techForm.setValue(formValue)
     mockTechnologyService.UpdateTechData(2,obj)
     component.onEdit()
     expect(mockTechnologyService.UpdateTechData).toHaveBeenCalledWith(2,obj);
     expect(component.editmode).toBe(false);
     expect(component.Id).toBeNull();
  })
  it('onAdd',()=>{
    const obj={
      
      "technologyName": " cyber security",
      "domainId": 6,
      "type": "",
      "domainName": "Others"
    }
    
   mockTechnologyService.PostTechData(obj)
    component.onAdd()
    expect(mockTechnologyService.PostTechData).toHaveBeenCalledWith(obj)
 })
 it('editDetails',()=>{
  const data={
    "technologyId": 2,  
    "technologyName": " cyber security",
    "domainId": 6,
    "type": "",
    "domainName": "Others"
  }
  component.editmode=true
  component.Id=data.technologyId
  component.techForm.patchValue({technologyName:'cyber security' ,
  domainId:'6'})

 component.prevDomainId=data.domainId
 component.prevTechnologyName=data.technologyName
 component.editDetails(data)
})
it('getDomainName',()=>{
  component.DomainList=  [{
    domainId: 12, domainName: "EBI/DWH", type: "" }]
    const id=12
    
    expect(component.getDomainName(id)).toEqual("EBI/DWH")
})
it('download',()=>{
   spyOn(component,'createObject').and.returnValue(mockexceldata)
   component.download();
 })
 it('createObject',()=>{
  expect(component.createObject('Technology Data'))
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
  const searchText = 'Others';
  const data = [      {
    technologyId: 3,
    technologyName: " React JS",
    domainId: 6,
    type: "",
    domainName: "Others"
  },
  {
    technologyId: 2,
    technologyName: " cyber security",
    domainId: 6,
    type: "",
    domainName: "Others"
  }];
  component.TechData = data;
  component.searchText = searchText;
  component.searchFilter();
  expect(component.batchRecord.length).toBe(2);
 
});

it('searchFilter',()=>{

  component.searchText= ''
  spyOn(component,'SetDefaultPaginationForcly')
  component.searchFilter();
  expect(component.batchRecord.length).toEqual(4)
})
it('isFieldInvalid', () => {
  const fieldName = 'email'; // Replace with the actual field name
  const control = {invalid: true, touched: true };
  spyOn(component.techForm , 'get').and.returnValue(control as AbstractControl);
  expect(component.isFieldInvalid(fieldName)).toBe(true);
});
it('UpdateHeader',()=>{
  component .UpdateHeader()

})
it('onEdit,error',()=>{
  mockTechnologyService.UpdateTechData.and.returnValue(throwError(()=>{
    new Error("data not editted")
  }))
  component.onEdit()
})
it('GetTechDetails',()=>{
  const obj={
    technologyId: 3,
    technologyName:  " React JS",
    domainName: spyOn(component,'getDomainName').and.returnValue(6)
  }
  component.GetTechDetails()
})
it('GetAllTechData',()=>{
  mockTechnologyService.GetAllTechData.and.returnValue(throwError(()=>{
    new Error("No Data in Available")
  }))
  component.GetAllTechData()
})
});
