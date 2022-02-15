import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeModel } from '../model/employee-dash board.model';
import { Role } from '../model/role.model';
import { User } from '../model/User.model';


@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  
  
  public loggedUser: string = "";
  public isloggedIn:Boolean = false;
  public roles: Role[] = [];   
  
  

  constructor(
    private route:ActivatedRoute, 
    private router:Router,
    private http: HttpClient
  ) { }

  public getUserFromBD(username:string): Observable<User> {
    return this.http.get<User>(environment.API_URL+"login/"+username);
  }

  

  logout() {
    this.isloggedIn = false;
    this.loggedUser = '';
    this.roles = [];
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }


  SignIn(user: User) {
    this.loggedUser = user.username;
    this.isloggedIn = true;//je suis connectée
    this.roles = user.roles;
    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
  }

  isAdmin(): Boolean {
    let admin: Boolean = false;
    if (!this.roles)//this.roles==undefiened
      return false;
    this.roles.forEach((curRole) => {
      if (curRole.role == 'ADMIN') {
        admin = true;
      }
    });
    return admin;
  }

  
}
