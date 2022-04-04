import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
 
  constructor(public authService: AuthService,public router: Router) { }

  ngOnInit(): void {
  }
   
  submitLogin(loginForm: NgForm): void { 
      this.authService.LogIn(loginForm.form.value.email,loginForm.form.value.password);  
      this.router.navigate(['/home']) ;
  }
 
}
