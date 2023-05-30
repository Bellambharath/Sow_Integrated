import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  apiUrl = environment.apiUrl;
  baseUrl: string = this.apiUrl + "/ChangePassword";
  constructor(private http: HttpClient, private router: Router) { }

  UpdatePasswordData(obj): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`, obj)
  }

}
