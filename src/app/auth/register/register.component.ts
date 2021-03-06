import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : IEmployee;
  constructor(public db: AngularFirestore,public authService: AuthService,public router: Router) { }

  ngOnInit(): void {
  }

  submitRegister(registerForm: NgForm){
    this.user = registerForm.form.value as IEmployee;
    this.user.role = 3; 
    this.db.collection('user').add(this.user);
    this.authService.LogIn(registerForm.form.value.email,registerForm.form.value.password);  
    this.router.navigate(['/home']) ;
  }
}
