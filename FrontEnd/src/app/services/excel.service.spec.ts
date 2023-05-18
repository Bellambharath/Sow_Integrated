import { TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';
import { ExcelService } from './excel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ExcelService]
    });
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('exportAsExcelFile', () => {
     const json = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const excelFileName = 'test-file';
    service.exportAsExcelFile(json, excelFileName);
  });

  it('jsonExportAsExcel', () => {
    const json = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];
    const excelFileName = 'test-file';
    const headers = [['ID', 'Name']];
    service.jsonExportAsExcel(json, excelFileName, headers);
  });

  it('isObject', () => {
    const values = { id: 1, name: 'John Doe' };
    const result = service.isObject(values);
    expect(result).toBe(true);
  });

  it('isObject,return false', () => {
    const values = [{ id: 1, name: 'John Doe' }];
    const result = service.isObject(values);
    expect(result).toBe(false);
  });

  it('getKeys,return headers', () => {
    const object = { id: 1, name: 'John Doe' };
    const result = service.getKeys(object);
    expect(result).toEqual(['id', 'name']);
  });

  it('getKeys,return null', () => {
    const object = null;
    const result = service.getKeys(object);
    expect(result).toEqual([]);
  });

  it('isValue,return true', () => {
    const value = 123;
    const result = service.isValue(value);
    expect(result).toBe(true);
  });

  it('isValue,return false', () => {
    const value = { id: 1, name: 'John Doe' };
    const result = service.isValue(value);
    expect(result).toBe(false);
  });
});

