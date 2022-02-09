import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../model/employee-dash board.model';
import { Observable } from 'rxjs/internal/Observable';
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
    return this.http.post<EmployeeModel>("http://localhost:9090/users/post", employee, { headers: this.getHeaders() });
  }
  public getEmploye(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>("http://localhost:9090/users/get");
  }
  public UpdateEmploye(employee: EmployeeModel, id: number) {
    return this.http.put<any>("http://localhost:9090/users/put/"+id, employee)
  }
  public DeleteEmploye(id: number) {
    return this.http.delete<any>("http://localhost:9090/users/delete/"+ id)
  }
}
