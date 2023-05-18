import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationcommonComponent } from './paginationcommon.component';

describe('PaginationcommonComponent', () => {
  let component: PaginationcommonComponent;
  let fixture: ComponentFixture<PaginationcommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationcommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationcommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
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
  it('OnPageNumberChanged, pagenumber > totapages',()=>{
    const event={target:{value:10}}
     component.totalPages=4
     component.OnPageNumberChanged(event)
     expect(component.currentPage).toEqual(1)
     expect(event.target.value).toEqual(1)
    })
    it('OnPageNumberChanged,pagenumber=0',()=>{
      const event={target:{value:0}}
      component.totalPages=4
      component.OnPageNumberChanged(event)
      expect(component.currentPage).toEqual(1)
      expect(event.target.value).toEqual(1)
    })
    it('OnPageNumberChanged, pagenumber<total',()=>{
      const event={target:{value:2}}
      component.totalPages=10
      component.OnPageNumberChanged(event)
      expect(component.currentPage).toEqual(2)
      expect(event.target.value).toEqual(2)
    })
    it('SetDefaultPagination',()=>{
      component.SetDefaultPagination()
      expect( component.SetDefaultPagination()).toBe()
    })
    it('SetDefaultPaginationForcly',()=>{
      component.batchFilteredRecord=[1,2,3]
      component.currentPage=2
      component.SetDefaultPaginationForcly([1,2])

    })
});
