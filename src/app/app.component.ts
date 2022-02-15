import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_test';



  constructor(
    public authService: AuthServiceService,
  ) { }

  onLogout() {
    this.authService.logout()
  }

}
