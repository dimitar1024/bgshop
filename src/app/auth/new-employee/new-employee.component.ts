import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  user : IEmployee;
  constructor(public db: AngularFirestore,public authService: AuthService,public router: Router) { }

  ngOnInit(): void {
  }

  submitRegister(registerForm: NgForm){
    this.user = registerForm.form.value as IEmployee;
    this.user.role = 2; 
    this.db.collection('user').add(this.user);  
    Swal.fire('Успешно', 'Успешно записахте служител!', 'success')
    this.router.navigate(['admin/employees']) ;
  }
}
