import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  @ViewChild('editProfileForm') editProfileForm: NgForm;
  emplDocId: string;
  constructor(public db: AngularFirestore, private activatedRoute: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      this.emplDocId = id;

      this.db.collection('user').doc(id).snapshotChanges()
        .subscribe((response) => {
          let emp = response.payload.data() as IEmployee;
          setTimeout(() => {
            this.editProfileForm.form.patchValue({
              first_name: emp.first_name,
              last_name: emp.last_name,
              phone: emp.phone,
              username: emp.username,
              address: emp.address,
            })
          });
        });

    })
  }

  submitProfile() {
    this.db.doc('user/' + this.emplDocId).update({
      first_name: this.editProfileForm.form.controls['first_name'].value,
      last_name: this.editProfileForm.form.controls['last_name'].value,
      address: this.editProfileForm.form.controls['address'].value,
      phone: this.editProfileForm.form.controls['phone'].value,
      username: this.editProfileForm.form.controls['username'].value
    });

    Swal.fire('Успешно', 'Успешно записахте профила!', 'success')
    this.router.navigate(['/home']) ;
  }
}
