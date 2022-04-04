import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  empl: IEmployee ;
  isLoggedIn: boolean
  role: number = 0;

  constructor(public authService: AuthService, public router: Router) {
    this.empl = authService.currentUser;
    this.isLoggedIn = authService.isLoggedIn;
    this.role = authService.currentUser.role;
  }

  ngOnInit(): void {
  }

  logout(): any {  
     this.authService.LogOut(); 
     this.isLoggedIn = false; 
     this.role= 0;
  }
}
