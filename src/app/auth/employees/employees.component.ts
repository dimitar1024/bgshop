import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEmployee } from 'src/app/interfaces/IEmployee';
import { IProduct } from 'src/app/interfaces/IProduct';
import Swal from 'sweetalert2';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
 

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[];



  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'email', 'phone', 'actions'];
  // displayedColumns: string[] = ['first_name', 'last_name' ];
   

  constructor(public db: AngularFirestore) {
    this.getAllEmployees();
  }
  ngOnInit(): void {
  }

  getAllEmployees() {
    this.db.collection('user', ref => ref.where('role', '==', 2)).snapshotChanges().subscribe((response) => {
      this.employees = response.map(item => {
        let prod: IEmployee = item.payload.doc.data() as IEmployee;
        prod.docId = item.payload.doc.id;
        return prod;
      }
      );
    })
  }

  deleteEmployee(docid: string) {
    Swal.fire({
      title: 'Сигурни ли сте че искате да изтриете този служител',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Да',
      cancelButtonText: 'Не'
    }).then((result) => {
      if (result.value) {
        this.db.collection('user').doc(docid).delete();
        Swal.fire(
          'Изтрит!',
          'Успешно изтрихте служителя',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }

}
