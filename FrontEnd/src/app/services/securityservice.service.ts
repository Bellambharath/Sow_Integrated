import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityserviceService {
  apiUrl=environment.apiUrl;
  baseUrl: string =this.apiUrl+ "/Security";
  constructor(private http: HttpClient) { }
  getAllQuestions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  postAnswer(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`,data );
  }
  getValidateSecurityQnA(param: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ValidateSecurityQnA`,{params:param});
  }
  UpdateQuestion(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data)
  }
  GetQuestionById(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }
  GetAnswerById(param:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/SecurityAnswer`,{params:param})
  }
}