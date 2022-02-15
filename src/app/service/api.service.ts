import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../model/employee-dash board.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  constructor(private http: HttpClient) {
    
  
  }
  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return headers;
  }
  


  public postEmploye(employee: EmployeeModel) {
    return this.http.post<EmployeeModel>(environment.API_URL+"users/", employee, { headers: this.getHeaders() });
  }
  public getEmploye(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(environment.API_URL+"users/");
  }
  public UpdateEmploye(employee: EmployeeModel, id: number) {
    return this.http.put<any>(environment.API_URL+"users/"+id, employee)
  }
  public DeleteEmploye(id: number) {
    return this.http.delete<any>(environment.API_URL+"users/"+ id)
  }
}
