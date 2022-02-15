import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route ,ParamMap, Router, UrlSegment} from '@angular/router';
import { User } from '../model/User.model';
import { AuthServiceService } from '../service/auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur=0;



  constructor(
    private route:ActivatedRoute, 
    private authService:AuthServiceService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    this.authService.getUserFromBD(this.user.username).subscribe((us : User) => {
      if (us.password == this.user.password)
      {
        this.authService.SignIn(us);
        (<any>this.router).navigate(['/employee']);
      }
      else
        this.erreur = 1
    },
    (err) => console.log(err));
      
    
  }
}








